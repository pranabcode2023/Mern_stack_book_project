import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// interface profile: {
//     _id: any;
//     email: any;
//     username: any;
//     books: any;
//     image: any;
//   };
// 
interface ProfileProps {
  profile:any
}

const DeleteProfile: React.FC<ProfileProps> = ({ profile }) => {
  const { _id, email, username, books, image } = profile;
  // console.log('profile', profile)
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}authors/delete/${_id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.log('Error deleting profile:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (isDeleted) {
    return null; // Render nothing if the profile is deleted
  }

  return (
    <div className="bookCard">
      <div className="container">
        <img src={profile?.image} alt="" />
        <h3>{profile?.username}</h3>
        <h3>{profile?.email}</h3>
        <button onClick={deleteHandler}>Delete </button>
          <h1>Uploaded Books</h1>
        {profile.books && profile.books.map((book:any) => {
          return (
            <div>
              <p>{book.name}</p>
              {/* NOTE authors uploaded book section */}
              <img src={book.image} alt=""/>
            </div>
          )
        })}
     </div>
    </div>


  );
};

export default DeleteProfile;






