// import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// type Props = {};

// interface ProfileData {
//   email: string;
//   username: string;
//   books: string;
//   avatar: File | string;
// }

// const UpdateProfile = (props: Props) => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();

//   const [formData, setFormData] = useState<ProfileData>({
//     email: "",
//     username: "",
//     books: "",
//     avatar: "",
//   });

//   useEffect(() => {
//     const fetchProfileDetails = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_BASE_URL}users/all/${id}`
//         );
//         const data = await response.json();
//         const profileData: ProfileData = data.profile;
//         setFormData((prevData) => ({ ...prevData, ...profileData }));
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProfileDetails();
//   }, [id]);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       setFormData((prevData) => ({ ...prevData, image: file }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, image: "" }));
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const submitData = new FormData();
//       submitData.append("email", formData.email);
//       submitData.append("username", formData.username);
//       submitData.append("books", formData.books);
//       submitData.append("avatar", formData.avatar);

//       const requestOptions = {
//         method: "PUT",
//         body: submitData,
//       };

//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}users/update/${id}`,
//         requestOptions
//       );
//       if (response.ok) {
//         navigate("/profile");
//         alert("Profile updated successfully.");
//       } else {
//         throw new Error("Failed to update the profile");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Failed to update the profile.");
//     }
//   };

//   return (
//     <div className="bookDetails">
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="title">Profile Details</div>
//         <div className="input-container">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             name="email"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             value={formData.username}
//             onChange={handleChange}
//             name="username"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="books">Books</label>
//           <input
//             type="text"
//             id="books"
//             placeholder="Books"
//             value={formData.books}
//             onChange={handleChange}
//             name="books"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="image">Image</label>
//           <input type="file" id="image" onChange={handleFile} name="image" />
//         </div>
//         <div className="button-container">
//           <button type="submit">Update Profile</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateProfile;

import { AuthContext } from "../../contexts/AuthContext";
import React, { ChangeEvent, FormEvent, useState, useContext } from "react";

type Props = {};

type Avatar = string | File;

interface FormData {
  email: string;
  password: string;
  username: string;
  avatar: Avatar;
}

const UpdateProfile = (props: Props) => {
  const { user, setUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  console.log("this is the user", user);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    avatar: "",
  });
  
  const fileInput = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, avatar: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitData = new FormData();
    if (formData.email !== "") {
      submitData.append("email", formData.email);
    }
    if (formData.password !== "") {
      submitData.append("password", formData.password);
    }
    if (formData.username !== "") {
      submitData.append("username", formData.username);
    }
    if (formData.avatar !== "") {
      submitData.append("avatar", formData.avatar);
    }
    const requestOptions = {
      method: "PUT",
      headers: new Headers({ Authorization: `Bearer ${token}` }),
      body: submitData,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/update/${user?._id}`,
        requestOptions
      );
      const result = await response.json();
      setUser(result.users);
      setFormData({
        // Reset form
        email: "",
        password: "",
        username: "",
        avatar: "",
      });
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="inner-component">
      <h1 className="profile-page-header">View / Edit your profile</h1>
      <div className="edit-profile-container">
        <div className="profile-pic-frame">
          <div
            className="profile-pic"
            style={{ backgroundImage: `url(${(user && user.avatar) || ""})` }}
          ></div>
          <p className="profile-pic-text">{user && user.username}</p>
          <p className="profile-pic-text">{user && user.email}</p>
        </div>
        <div className="profile-edit-frame">
          <div className="profile-edit">
            <div className="semi-img-edit-profile">
              <p>
                Current eamil : {user && user.email}
                <br /> Current username : {user && user.username}
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="email"
                  onChange={handleChange}
                  className="input-text-area"
                  id="email-input-profile-page"
                />
                <br />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="password"
                  onChange={handleChange}
                  className="input-text-area"
                />
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="username"
                  onChange={handleChange}
                />
                <br />
                <input
                  ref={fileInput}
                  type="file"
                  name="avatar"
                  onChange={handleFile}
                  accept="image/png, image/jpg, image/jpeg"
                  className="text-input-position"
                />
                <br />
                <button
                  id="submit-btn-profile-page"
                  className="custom-button"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>

            <div className="profile-pic-text-div">
             Change your Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
