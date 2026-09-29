import { useState } from "react";
import axios from "axios";

function BookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    publicationYear: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/books",
        formData
      );

      setMessage(response.data.message);

      setFormData({
        title: "",
        author: "",
        isbn: "",
        category: "",
        publicationYear: ""
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to add book"
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
        />

        <label>Author Name</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
        />

        <label>ISBN</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />

        <label>Publication Year</label>
        <input
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          placeholder="Enter publication year"
        />

        <button type="submit">Add Book</button>
      </form>

      {message && <p className="message">{message}</p>}
    </>
  );
}

export default BookForm;