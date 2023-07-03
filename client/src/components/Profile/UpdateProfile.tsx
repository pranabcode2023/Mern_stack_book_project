import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

interface ProfileData {
  email: string;
  username: string;
  books: string;
  avatar: File | string;
}

const UpdateProfile = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<ProfileData>({
    email: "",
    username: "",
    books: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}users/all/${id}`
        );
        const data = await response.json();
        const profileData: ProfileData = data.profile;
        setFormData((prevData) => ({ ...prevData, ...profileData }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileDetails();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
    } else {
      setFormData((prevData) => ({ ...prevData, image: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("email", formData.email);
      submitData.append("username", formData.username);
      submitData.append("books", formData.books);
      submitData.append("avatar", formData.avatar);

      const requestOptions = {
        method: "PUT",
        body: submitData,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/update/${id}`,
        requestOptions
      );
      if (response.ok) {
        navigate("/profile");
        alert("Profile updated successfully.");
      } else {
        throw new Error("Failed to update the profile");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update the profile.");
    }
  };

  return (
    <div className="bookDetails">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Profile Details</div>
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
          <button type="submit">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
