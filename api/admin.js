const { readDB, writeDB } = require('../utils/db');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { action, bot_token, chat_id, verification_type, user_id, admin_key } = req.query;

    // Check admin key
    if (admin_key !== process.env.ADMIN_KEY && admin_key !== 'admin123') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid admin key'
      });
    }

    const db = readDB();

    if (action === 'get_settings') {
      return res.status(200).json({
        status: 'success',
        data: {
          bot_token: db.settings.bot_token,
          chat_id: db.settings.chat_id,
          verification_type: db.settings.verification_type
        }
      });
    }

    if (action === 'update_settings') {
      if (bot_token) db.settings.bot_token = bot_token;
      if (chat_id) db.settings.chat_id = chat_id;
      if (verification_type) db.settings.verification_type = verification_type;
      
      writeDB(db);
      return res.status(200).json({
        status: 'success',
        message: 'Settings updated successfully',
        data: db.settings
      });
    }

    if (action === 'update_user') {
      const { user_id, status } = req.query;
      
      if (!user_id) {
        return res.status(400).json({
          status: 'error',
          message: 'User ID required'
        });
      }

      db.verified_users[user_id] = {
        status: status || db.settings.verification_type,
        timestamp: Date.now(),
        updated_at: new Date().toISOString()
      };

      // Update stats
      if (status === 'success') {
        db.verification_stats.success = (db.verification_stats.success || 0) + 1;
      } else if (status === 'failed') {
        db.verification_stats.failed = (db.verification_stats.failed || 0) + 1;
      } else {
        db.verification_stats.unable = (db.verification_stats.unable || 0) + 1;
      }

      writeDB(db);
      return res.status(200).json({
        status: 'success',
        message: `User ${user_id} updated to ${status}`,
        data: db.verified_users[user_id]
      });
    }

    if (action === 'get_logs') {
      const limit = parseInt(req.query.limit) || 100;
      return res.status(200).json({
        status: 'success',
        data: db.logs.slice(0, limit)
      });
    }

    if (action === 'get_stats') {
      return res.status(200).json({
        status: 'success',
        data: {
          ...db.verification_stats,
          total_users: Object.keys(db.verified_users).length,
          total_logs: db.logs.length,
          settings: db.settings
        }
      });
    }

    if (action === 'clear_logs') {
      db.logs = [];
      writeDB(db);
      return res.status(200).json({
        status: 'success',
        message: 'Logs cleared successfully'
      });
    }

    return res.status(400).json({
      status: 'error',
      message: 'Invalid action'
    });

  } catch (error) {
    console.error('Admin error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
