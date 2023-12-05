import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../utilis/serverURL";

type Props = {};

type Avatar = string | File;

interface FormData {
  email: string;
  password: string;
  username: string;
  avatar: Avatar;
}

const Register = (props: Props) => {
  const navigate = useNavigate();
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
    navigate("/login");
    console.log(formData);
    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("password", formData.password);
    submitData.append("username", formData.username);
    submitData.append("avatar", formData.avatar);
    console.log("testing registration - submitdata", submitData);
    const requestOptions = {
      method: "POST",
      body: submitData,
    };
    try {
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}users/new`,
        `${serverURL}/api/users/new`,
        requestOptions
      );
      const result = await response.json();
      console.log(result);
      alert("Success! Check console.");
    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console");
    }
  };

  return (
    <div className="register-page-container">
      <form className="register-page-form" onSubmit={handleSubmit}>
        <div className="title">
          {" "}
          <h4>Register</h4>
        </div>

        {/* <div className="input-container"> */}
        <input
          type="text"
          name="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="text"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="file"
          ref={fileInput}
          name="avatar"
          onChange={handleFile}
          accept="image/png, image/jpg, image/jpeg, image/gif"
        />

        <button type="submit">Register me!</button>
        {/* </div> */}
      </form>
      {/* <div className="register-div-gif"></div> */}
    </div>
  );
};

export default Register;
