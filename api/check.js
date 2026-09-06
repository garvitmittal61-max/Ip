const { verifyIP } = require('../utils/verification');
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
    if (apikey !== process.env.API_KEY && apikey !== 'default_key_here') {
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

    // Verify IP
    const verificationResult = await verifyIP(clientIp);

    // Log the request
    const db = readDB();
    const logEntry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ip: clientIp,
      endpoint: '/check',
      bot_token: bot_token || 'N/A',
      chat_id: verify || 'N/A',
      verification: verificationResult,
      user_agent: req.headers['user-agent'] || 'Unknown'
    };
    
    db.logs.unshift(logEntry);
    db.verification_stats.total = (db.verification_stats.total || 0) + 1;
    writeDB(db);

    // Return verification result
    return res.status(200).json({
      status: 'success',
      data: verificationResult,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Check error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};
