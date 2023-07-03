import React, { useState } from "react";
import { Link } from "react-router-dom";

interface ProfileProps {
  profile: any;
}

const DeleteProfile: React.FC<ProfileProps> = ({ profile }) => {
  const { _id, email, username, books, avatar } = profile;
  // console.log("profile", profile);
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/delete/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.log("Error deleting profile:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (isDeleted) {
    return null; // Render nothing if the profile is deleted
  }

  return (
    <div className="bookCard">
      <div className="container">
        <img src={profile?.avatar} alt="" />
        <h3>User Name: {profile?.username}</h3>
        <h3>Email: {profile?.email}</h3>
        <div className="container">
          <Link to={`/profile/${_id}`}>
            <button>Update</button>
          </Link>
        </div>
        <button onClick={deleteHandler}>Delete </button>
        <h1>Uploaded Books</h1>
        {profile.books &&
          profile.books.map((book: any) => {
            return (
              <div>
                <p>{book.name}</p>
                {/* NOTE authors uploaded book section */}
                <img src={book.avatar} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DeleteProfile;
