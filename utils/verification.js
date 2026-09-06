const axios = require('axios');

const verifyIP = async (ip) => {
  try {
    // Check if IP is VPN/Proxy using multiple services
    const [ipinfo, ipquality] = await Promise.allSettled([
      axios.get(`https://ipinfo.io/${ip}/json`),
      axios.get(`https://ipqualityscore.com/api/json/ip/${process.env.IP_QUALITY_KEY || ''}/${ip}`)
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

    // Parse IPInfo data
    if (ipinfo.status === 'fulfilled' && ipinfo.value.data) {
      const data = ipinfo.value.data;
      result.country = data.country || '';
      result.city = data.city || '';
      result.region = data.region || '';
      result.isp = data.org || '';
      result.details.ipinfo = data;
    }

    // Parse IPQualityScore data
    if (ipquality.status === 'fulfilled' && ipquality.value.data) {
      const data = ipquality.value.data;
      result.isVPN = data.vpn || false;
      result.isProxy = data.proxy || false;
      result.isTor = data.tor || false;
      result.risk_score = data.risk_score || 0;
      result.details.ipquality = data;
    }

    // Check if using airplane mode or localhost
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
