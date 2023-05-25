import React, { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AuthorProfile = () => {
  const { author } = useContext(AuthContext)
  console.log('author in priofile', author)
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    image: null as File | null, // Update the type to File | null
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]; // Check if files exist before accessing the first file
    setFormData({ ...formData, image: file || null }); // Assign the file or null
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic (e.g., send data to the backend)
    console.log(formData);
    // Reset form fields
    setFormData({
      email: '',
      username: '',
      password: '',
      image: null,
    });
  };

  return (
    <div className="register">
      <h2>Profile Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <label>Profile Image:</label>
        <input type="file" name="image" onChange={handleFileChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AuthorProfile;
