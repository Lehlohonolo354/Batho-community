import React, { useState, useEffect } from 'react';

function Books() {
  // Load initial books from localStorage, or use default sample list
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem('library_books');
    return savedBooks ? JSON.parse(savedBooks) : [
      { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565' },
      { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084' }
    ];
  });

  const [formData, setFormData] = useState({ title: '', author: '', isbn: '' });
  const [editingId, setEditingId] = useState(null);

  // Sync state to localStorage whenever 'books' changes
  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn) return;

    if (editingId) {
      setBooks(books.map(book => book.id === editingId ? { ...formData, id: editingId } : book));
      setEditingId(null);
    } else {
      const newBook = { ...formData, id: Date.now() };
      setBooks([...books, newBook]);
    }

    setFormData({ title: '', author: '', isbn: '' });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData({ title: book.title, author: book.author, isbn: book.isbn });
  };

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ title: '', author: '', isbn: '' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
      <h2>Books Management</h2>

      <form onSubmit={handleSubmit} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Edit Book' : 'Add New Book'}</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleInputChange}
            style={{ flex: 1, padding: '8px' }}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleInputChange}
            style={{ flex: 1, padding: '8px' }}
            required
          />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleInputChange}
            style={{ flex: 1, padding: '8px' }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {editingId ? 'Update Book' : 'Add Book'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancel} style={{ padding: '8px 16px', marginLeft: '10px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc', backgroundColor: '#e9ecef' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>Title</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Author</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>ISBN</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px' }}>{book.title}</td>
                <td style={{ padding: '10px' }}>{book.author}</td>
                <td style={{ padding: '10px' }}>{book.isbn}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button onClick={() => handleEdit(book)} style={{ marginRight: '8px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(book.id)} style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: '15px', textAlign: 'center', color: '#666' }}>
                No books available. Add a new book above!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Books;