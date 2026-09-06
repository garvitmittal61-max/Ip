const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data.json');

// Initialize database
const initDB = () => {
  if (!fs.existsSync(DB_PATH)) {
    const initialData = {
      settings: {
        bot_token: '',
        chat_id: '',
        verification_type: 'success'
      },
      logs: [],
      verified_users: {},
      verification_stats: {
        total: 0,
        success: 0,
        failed: 0,
        unable: 0
      }
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
  }
};

const readDB = () => {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB, initDB };
