import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {};

interface ProfileData {
  email: string;
  username: string;
  books: string;
  image: File | string;
}

const ProfilesDetails = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<ProfileData>({
    email: '',
    username: '',
    books: '',
    image: '',
  });

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}authors/all/${id}`);
        const data = await response.json();
        const profileData: ProfileData = data.profile;
        setFormData(profileData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileDetails();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, image: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append('email', formData.email);
      submitData.append('username', formData.username);
      submitData.append('books', formData.books);
      submitData.append('image', formData.image);

      const requestOptions = {
        method: 'PUT',
        body: submitData,
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}authors/updatebook/${id}`, requestOptions);
      if (response.ok) {
        navigate('/profile');
        alert('Book updated successfully.');
      } else {
        throw new Error('Failed to update the book.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to update the book.');
    }
  };

  return (
    <div className="bookDetails">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Book Details</div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            name="username"
          />
        </div>
        <div className="input-container">
          <label htmlFor="books">Books</label>
          <input
            type="text"
            id="books"
            placeholder="Books"
            value={formData.books}
            onChange={handleChange}
            name="books"
          />
        </div>
        <div className="input-container">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={handleFile} name="image" />
        </div>
        <div className="button-container">
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilesDetails;
