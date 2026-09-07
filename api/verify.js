const { checkVerificationStatus } = require('../utils/verification');
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
    const { apikey, bot_token, verify } = req.query;

    // Check API key
    if (apikey !== 'default_key_here') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid API key'
      });
    }

    // Get client IP
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     req.ip ||
                     'Unknown';

    const db = readDB();
    
    // Check if user exists in verified users
    const userStatus = checkVerificationStatus(verify, db);
    
    let status = 'failed';
    let message = 'User not verified';
    let data = {};

    if (userStatus === 'success') {
      status = 'success';
      message = 'User successfully verified';
      data = db.verified_users[verify] || {};
    } else if (userStatus === 'failed') {
      status = 'failed';
      message = 'User failed verification';
    } else {
      status = 'unable';
      message = 'User not started verification at this moment';
    }

    // Log the request
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ip: clientIp,
      endpoint: '/verify',
      bot_token: bot_token || 'N/A',
      chat_id: verify || 'N/A',
      status: status,
      message: message,
      user_agent: req.headers['user-agent'] || 'Unknown'
    };
    
    db.logs.unshift(logEntry);
    writeDB(db);

    return res.status(200).json({
      status: status,
      message: message,
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Verify error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
