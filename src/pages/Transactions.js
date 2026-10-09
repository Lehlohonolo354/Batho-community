import React, { useState, useEffect } from 'react';

function Transactions() {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  
  // Form State
  const [selectedBookId, setSelectedBookId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [actionType, setActionType] = useState('Borrow'); // 'Borrow' or 'Return'

  // Load books and transactions from localStorage
  useEffect(() => {
    const savedBooks = localStorage.getItem('library_books');
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }

    const savedTransactions = localStorage.getItem('library_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage
  const saveTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
    localStorage.setItem('library_transactions', JSON.stringify(updatedTransactions));
  };

  // Calculate Summary Metrics
  const borrowedCount = transactions.filter(t => t.type === 'Borrow').length;
  const returnedCount = transactions.filter(t => t.type === 'Return').length;
  const addedCount = transactions.filter(t => t.type === 'Added').length;

  // Handle Form Submission (Borrow/Return)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedBookId || !memberName) return;

    const book = books.find(b => b.id === Number(selectedBookId));
    if (!book) return;

    const newTransaction = {
      id: Date.now(),
      bookTitle: book.title,
      memberName: memberName,
      type: actionType,
      date: new Date().toLocaleDateString()
    };

    const updatedTransactions = [newTransaction, ...transactions];
    saveTransactions(updatedTransactions);

    // Reset Form
    setSelectedBookId('');
    setMemberName('');
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'left' }}>
      <h2>Transactions & Activity Log</h2>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#28a745', color: '#fff' }}>
          <h4 style={{ margin: 0 }}>Books Added</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{addedCount}</p>
        </div>

        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#007bff', color: '#fff' }}>
          <h4 style={{ margin: 0 }}>Books Borrowed</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{borrowedCount}</p>
        </div>

        <div style={{ flex: 1, padding: '15px', borderRadius: '8px', backgroundColor: '#17a2b8', color: '#fff' }}>
          <h4 style={{ margin: 0 }}>Books Returned</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '5px 0 0 0' }}>{returnedCount}</p>
        </div>
      </div>

      {/* Log Transaction Form */}
      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '25px' }}>
        <h3>Log Borrow or Return</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <select 
            value={selectedBookId} 
            onChange={(e) => setSelectedBookId(e.target.value)}
            style={{ flex: 1, padding: '8px' }}
            required
          >
            <option value="">Select Book...</option>
            {books.map(b => (
              <option key={b.id} value={b.id}>{b.title}</option>
            ))}
          </select>

          <input 
            type="text" 
            placeholder="Member Name" 
            value={memberName} 
            onChange={(e) => setMemberName(e.target.value)} 
            style={{ flex: 1, padding: '8px' }}
            required 
          />

          <select 
            value={actionType} 
            onChange={(e) => setActionType(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="Borrow">Borrow</option>
            <option value="Return">Return</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Record Transaction
        </button>
      </form>

      {/* Transaction History Table */}
      <h3>Transaction History</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', backgroundColor: '#e9ecef' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Book</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Member</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{t.date}</td>
                <td style={{ padding: '10px' }}>{t.bookTitle}</td>
                <td style={{ padding: '10px' }}>{t.memberName || 'System'}</td>
                <td style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', color: t.type === 'Borrow' ? '#dc3545' : t.type === 'Return' ? '#28a745' : '#007bff' }}>
                  {t.type}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                No transactions recorded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;