<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - Verification System</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="admin-container">
        <div class="admin-sidebar">
            <div class="logo">
                <i class="fas fa-shield-alt"></i>
                <span>Admin Panel</span>
            </div>
            <nav class="admin-nav">
                <a href="#" class="active" data-tab="dashboard">
                    <i class="fas fa-chart-pie"></i>
                    Dashboard
                </a>
                <a href="#" data-tab="settings">
                    <i class="fas fa-cog"></i>
                    Settings
                </a>
                <a href="#" data-tab="users">
                    <i class="fas fa-users"></i>
                    Users
                </a>
                <a href="#" data-tab="logs">
                    <i class="fas fa-history"></i>
                    Logs
                </a>
            </nav>
        </div>

        <div class="admin-content">
            <!-- Dashboard Tab -->
            <div id="dashboard" class="tab-content active">
                <h1>Dashboard</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="totalUsers">0</h3>
                            <p>Total Users</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon green">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="successCount">0</h3>
                            <p>Successful</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon red">
                            <i class="fas fa-times-circle"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="failedCount">0</h3>
                            <p>Failed</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon yellow">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-info">
                            <h3 id="unableCount">0</h3>
                            <p>Unable</p>
                        </div>
                    </div>
                </div>
                <div class="quick-actions">
                    <h3>Quick Actions</h3>
                    <div class="action-buttons">
                        <button onclick="clearLogs()" class="action-btn danger">
                            <i class="fas fa-trash"></i> Clear Logs
                        </button>
                        <button onclick="refreshData()" class="action-btn primary">
                            <i class="fas fa-sync"></i> Refresh
                        </button>
                    </div>
                </div>
            </div>

            <!-- Settings Tab -->
            <div id="settings" class="tab-content">
                <h1>Settings</h1>
                <div class="settings-form">
                    <div class="form-group">
                        <label>Bot Token</label>
                        <input type="text" id="botToken" placeholder="Enter bot token">
                    </div>
                    <div class="form-group">
                        <label>Chat ID</label>
                        <input type="text" id="chatId" placeholder="Enter chat ID">
                    </div>
                    <div class="form-group">
                        <label>Verification Type</label>
                        <select id="verificationType">
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                            <option value="unable">Unable</option>
                        </select>
                    </div>
                    <button onclick="updateSettings()" class="save-btn">
                        <i class="fas fa-save"></i> Save Settings
                    </button>
                </div>

                <div class="user-control">
                    <h3>Update User Status</h3>
                    <div class="user-form">
                        <input type="text" id="userId" placeholder="Enter User ID / Chat ID">
                        <select id="userStatus">
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                            <option value="unable">Unable</option>
                        </select>
                        <button onclick="updateUser()" class="update-btn">
                            <i class="fas fa-user-edit"></i> Update User
                        </button>
                    </div>
                </div>
            </div>

            <!-- Users Tab -->
            <div id="users" class="tab-content">
                <h1>Verified Users</h1>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Status</th>
                                <th>Verified At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="usersTableBody">
                            <tr>
                                <td colspan="4" class="text-center">No users found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Logs Tab -->
            <div id="logs" class="tab-content">
                <h1>Logs</h1>
                <div class="logs-controls">
                    <input type="text" id="logSearch" placeholder="Search logs..." onkeyup="filterLogs()">
                    <button onclick="refreshLogs()" class="refresh-btn">
                        <i class="fas fa-sync"></i> Refresh
                    </button>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>IP</th>
                                <th>Endpoint</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody id="logsTableBody">
                            <tr>
                                <td colspan="5" class="text-center">No logs found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
    <script>
        // Admin panel specific functions
        let currentTab = 'dashboard';

        document.addEventListener('DOMContentLoaded', function() {
            // Tab switching
            document.querySelectorAll('.admin-nav a').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const tab = this.dataset.tab;
                    switchTab(tab);
                });
            });

            // Load initial data
            loadDashboard();
            loadSettings();
            loadUsers();
            loadLogs();
        });

        function switchTab(tab) {
            currentTab = tab;
            
            // Update active nav link
            document.querySelectorAll('.admin-nav a').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.tab === tab) {
                    link.classList.add('active');
                }
            });

            // Update active content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
                if (content.id === tab) {
                    content.classList.add('active');
                }
            });

            // Load data for tab
            if (tab === 'dashboard') loadDashboard();
            if (tab === 'users') loadUsers();
            if (tab === 'logs') loadLogs();
        }

        function loadDashboard() {
            fetch('/api/admin?action=get_stats&admin_key=admin123')
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        const stats = data.data;
                        document.getElementById('totalUsers').textContent = stats.total_users || 0;
                        document.getElementById('successCount').textContent = stats.success || 0;
                        document.getElementById('failedCount').textContent = stats.failed || 0;
                        document.getElementById('unableCount').textContent = stats.unable || 0;
                    }
                })
                .catch(err => console.error('Error loading dashboard:', err));
        }

        function loadSettings() {
            fetch('/api/admin?action=get_settings&admin_key=admin123')
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        document.getElementById('botToken').value = data.data.bot_token || '';
                        document.getElementById('chatId').value = data.data.chat_id || '';
                        document.getElementById('verificationType').value = data.data.verification_type || 'success';
                    }
                })
                .catch(err => console.error('Error loading settings:', err));
        }

        function updateSettings() {
            const botToken = document.getElementById('botToken').value;
            const chatId = document.getElementById('chatId').value;
            const verificationType = document.getElementById('verificationType').value;

            fetch(`/api/admin?action=update_settings&admin_key=admin123&bot_token=${encodeURIComponent(botToken)}&chat_id=${encodeURIComponent(chatId)}&verification_type=${verificationType}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Settings updated successfully!');
                        loadSettings();
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(err => console.error('Error updating settings:', err));
        }

        function updateUser() {
            const userId = document.getElementById('userId').value;
            const status = document.getElementById('userStatus').value;

            if (!userId) {
                alert('Please enter a User ID');
                return;
            }

            fetch(`/api/admin?action=update_user&admin_key=admin123&user_id=${encodeURIComponent(userId)}&status=${status}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('User updated successfully!');
                        document.getElementById('userId').value = '';
                        loadUsers();
                        loadDashboard();
                    } else {
                        alert('Error: ' + data.message);
                    }
                })
                .catch(err => console.error('Error updating user:', err));
        }

        function loadUsers() {
            fetch('/api/admin?action=get_logs&admin_key=admin123&limit=1000')
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Filter unique users from logs
                        const users = {};
                        data.data.forEach(log => {
                            if (log.chat_id && log.chat_id !== 'N/A') {
                                if (!users[log.chat_id]) {
                                    users[log.chat_id] = {
                                        id: log.chat_id,
                                        status: log.status || 'unknown',
                                        lastSeen: log.timestamp
                                    };
                                }
                            }
                        });

                        const tbody = document.getElementById('usersTableBody');
                        if (Object.keys(users).length === 0) {
                            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No users found</td></tr>';
                        } else {
                            tbody.innerHTML = Object.values(users).map(user => `
                                <tr>
                                    <td>${user.id}</td>
                                    <td><span class="status-badge ${user.status}">${user.status}</span></td>
                                    <td>${new Date(user.lastSeen).toLocaleString()}</td>
                                    <td>
                                        <button onclick="updateUserStatus('${user.id}')" class="small-btn">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            `).join('');
                        }
                    }
                })
                .catch(err => console.error('Error loading users:', err));
        }

        function loadLogs() {
            fetch('/api/admin?action=get_logs&admin_key=admin123&limit=100')
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        const tbody = document.getElementById('logsTableBody');
                        if (data.data.length === 0) {
                            tbody.innerHTML = '<tr><td colspan="5" class="text-center">No logs found</td></tr>';
                        } else {
                            tbody.innerHTML = data.data.map(log => `
                                <tr>
                                    <td>${new Date(log.timestamp).toLocaleString()}</td>
                                    <td>${log.ip || 'N/A'}</td>
                                    <td>${log.endpoint || 'N/A'}</td>
                                    <td><span class="status-badge ${log.status || 'unknown'}">${log.status || 'unknown'}</span></td>
                                    <td>${log.message || log.verification?.message || 'N/A'}</td>
                                </tr>
                            `).join('');
                        }
                    }
                })
                .catch(err => console.error('Error loading logs:', err));
        }

        function refreshLogs() {
            loadLogs();
        }

        function filterLogs() {
            const search = document.getElementById('logSearch').value.toLowerCase();
            const rows = document.querySelectorAll('#logsTableBody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(search) ? '' : 'none';
            });
        }

        function clearLogs() {
            if (confirm('Are you sure you want to clear all logs?')) {
                fetch('/api/admin?action=clear_logs&admin_key=admin123')
                    .then(res => res.json())
                    .then(data => {
                        if (data.status === 'success') {
                            alert('Logs cleared successfully!');
                            loadLogs();
                        } else {
                            alert('Error: ' + data.message);
                        }
                    })
                    .catch(err => console.error('Error clearing logs:', err));
            }
        }

        function refreshData() {
            loadDashboard();
            loadUsers();
            loadLogs();
            alert('Data refreshed!');
        }

        function updateUserStatus(userId) {
            document.getElementById('userId').value = userId;
            switchTab('settings');
        }
    </script>
</body>
</html>
