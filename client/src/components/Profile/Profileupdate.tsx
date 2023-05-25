import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  authorId: string; // Add the authorId prop
};

type SubmitUpdateData = {
  email: string;
  username: string;
  books: string[];
  image: File | string;
};

const AuthorProfile = ({ authorId }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SubmitUpdateData>({
    email: '',
    username: '',
    books: [],
    image: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('email', formData.email);
    submitData.append('username', formData.username);
    formData.books.forEach((book) => submitData.append('books', book));
    submitData.append('image', formData.image);

    navigate('/login');

    const requestOptions = {
      method: 'PUT',
      body: submitData,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}authors/${authorId}`, requestOptions);
      const result = await response.json();
      console.log(result);
      alert('Success! Check console.');
    } catch (error) {
      console.log(error);
      alert('Something went wrong - check console');
    }
  };

  return (
    <div className="author-profile-update">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Author Profile</div>
        <div className="input-container">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="input-container">
          <input name="username" placeholder="Username" onChange={handleChange} />
        </div>
        <div className="input-container">
          <input type="file" name="image" onChange={handleFile} />
        </div>
        <div className="input-container">
          <textarea
            name="books"
            placeholder="Books"
            onChange={(e) => setFormData({ ...formData, books: e.target.value.split(',') })}
          />
        </div>
        <div className="button-container">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default AuthorProfile;
