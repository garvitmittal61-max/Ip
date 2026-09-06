const axios = require('axios');

const verifyIP = async (ip) => {
  try {
    // Use only free services
    const [ipinfo] = await Promise.allSettled([
      axios.get(`https://ipinfo.io/${ip}/json`),
    ]);

    const result = {
      ip: ip,
      isVPN: false,
      isProxy: false,
      isTor: false,
      country: '',
      city: '',
      region: '',
      isp: '',
      risk_score: 0,
      details: {}
    };

    // Parse IPInfo data (this is free - no key needed)
    if (ipinfo.status === 'fulfilled' && ipinfo.value.data) {
      const data = ipinfo.value.data;
      result.country = data.country || '';
      result.city = data.city || '';
      result.region = data.region || '';
      result.isp = data.org || '';
      result.details.ipinfo = data;
      
      // Basic VPN detection using IPInfo data
      // Check if ISP is known VPN provider (basic detection)
      const vpnKeywords = ['vpn', 'proxy', 'hosting', 'cloud', 'datacenter'];
      if (data.org) {
        const ispLower = data.org.toLowerCase();
        result.isVPN = vpnKeywords.some(keyword => ispLower.includes(keyword));
      }
    }

    // Check if using localhost/airplane mode
    const isAirplaneMode = !ip || ip === '::1' || ip === '127.0.0.1' || ip === 'localhost';
    
    return {
      ...result,
      isAirplaneMode,
      isSecure: !result.isVPN && !result.isProxy && !result.isTor && !isAirplaneMode,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Verification error:', error);
    return {
      ip,
      error: 'Verification failed',
      isSecure: false,
      timestamp: new Date().toISOString()
    };
  }
};

const checkVerificationStatus = (userId, db) => {
  if (!db.verified_users[userId]) {
    return 'unable';
  }
  
  const user = db.verified_users[userId];
  const now = Date.now();
  const expiryTime = user.timestamp + (24 * 60 * 60 * 1000); // 24 hours expiry
  
  if (now > expiryTime) {
    return 'unable';
  }
  
  return user.status || 'failed';
};

module.exports = { verifyIP, checkVerificationStatus };
