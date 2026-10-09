import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    // Read books from localStorage
    const savedBooks = localStorage.getItem('library_books');
    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks);
      setBookCount(parsedBooks.length);
    } else {
      // Fallback default initial count matching Books component
      setBookCount(2);
    }
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h2>Dashboard Overview</h2>
      <p>Welcome to Batho Community Library System.</p>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{
          flex: 1,
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#007bff',
          color: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Available Books</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>{bookCount}</p>
        </div>

        <div style={{
          flex: 1,
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#28a745',
          color: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Active Members</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>0</p>
        </div>

        <div style={{
          flex: 1,
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#ffc107',
          color: '#333',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Total Transactions</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0 0 0' }}>0</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;