import React, { useState, useEffect } from 'react';

function Users() {
  // Load users from localStorage or default list
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('library_users');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Member' },
      { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' }
    ];
  });

  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Form States
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' });
  const [loginEmail, setLoginEmail] = useState('');
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'login'

  // Persist users to localStorage
  useEffect(() => {
    localStorage.setItem('library_users', JSON.stringify(users));
  }, [users]);

  // Persist current session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [currentUser]);

  // Admin: Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const createdUser = { ...newUser, id: Date.now() };
    setUsers([...users, createdUser]);
    setNewUser({ name: '', email: '', role: 'Member' });
  };

  // Admin: Delete User
  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(null);
    }
  };

  // Member: Login
  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      setLoginEmail('');
    } else {
      alert('User not found. Please ask an Admin to register your email.');
    }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h2>User Management & Portal</h2>

      {/* Login Status Banner */}
      {currentUser ? (
        <div style={{ background: '#d4edda', color: '#155724', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>Logged in as:</strong> {currentUser.name} ({currentUser.email}) — <em>{currentUser.role}</em>
          </div>
          <button onClick={handleLogout} style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '10px 15px', borderRadius: '8px', marginBottom: '20px' }}>
          No member currently logged in.
        </div>
      )}

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('admin')}
          style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: activeTab === 'admin' ? '#007bff' : '#e9ecef', color: activeTab === 'admin' ? '#fff' : '#333' }}
        >
          Admin Management
        </button>
        <button 
          onClick={() => setActiveTab('login')}
          style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: activeTab === 'login' ? '#007bff' : '#e9ecef', color: activeTab === 'login' ? '#fff' : '#333' }}
        >
          Member Login
        </button>
      </div>

      {/* TAB 1: ADMIN MANAGEMENT */}
      {activeTab === 'admin' && (
        <div>
          {/* Add User Form */}
          <form onSubmit={handleAddUser} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>Add New User</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                style={{ flex: 1, padding: '8px' }}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={{ flex: 1, padding: '8px' }}
                required
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                style={{ padding: '8px' }}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add User
            </button>
          </form>

          {/* User Directory Table */}
          <h3>Registered Users ({users.length})</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #ccc', backgroundColor: '#e9ecef' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Role</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{u.name}</td>
                    <td style={{ padding: '10px' }}>{u.email}</td>
                    <td style={{ padding: '10px' }}>{u.role}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                    No users registered. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: MEMBER LOGIN */}
      {activeTab === 'login' && (
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
          <h3>Member Portal Login</h3>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Enter Registered Email:</label>
              <input
                type="email"
                placeholder="e.g. john@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                required
              />
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Users;