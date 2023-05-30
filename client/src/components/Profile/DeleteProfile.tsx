// import React from 'react';
// import { Link } from 'react-router-dom';

// interface ProfileProps {
//   profile: {
//   _id: any,
 
//   email: any,
//   username: any,
//   books: any,

//   image: any
//   };
// }

// const Profile: React.FC<ProfileProps > = ({ profile}) => {
//   const { _id, email, username, books, image } = profile;

//   const deleteHandler = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}authors/delete/${_id}`,
//         {
//           method: 'DELETE',
//         }
//       );

//       if (response.ok) {
//         // Refresh the page after deleting the item
//         window.location.reload();
//       } else {
//         console.log('Error deleting profile:', response.status);
//       }
//     } catch (error) {
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <div className="bookCard">
//       <div className="container">
//         <img src={image} alt={image} />
//       </div>
//       <div className="container">
//         <h3> {email}</h3>
//         {/* <h3>{name}</h3> */}
//         <h3>{username}</h3>
//         <h3>{books}</h3>
//        {/* <h3>{bio}</h3> */}
//       </div>

//       <div className="container">
//         <Link to={`/authors/${_id}`}>
//           <button>Update</button>
//         </Link>
//       </div>

//       <div className="container">
//         <button onClick={deleteHandler}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

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
  // const { _id, email, username, books, image } = profile;
  // console.log('profile', profile)
  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = async () => {
    // try {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_BASE_URL}authors/delete/${_id}`,
    //     {
    //       method: 'DELETE',
    //     }
    //   );

    //   if (response.ok) {
    //     setIsDeleted(true);
    //   } else {
    //     console.log('Error deleting profile:', response.status);
    //   }
    // } catch (error) {
    //   console.log('Error:', error);
    // }
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
              {/* NOTE this would be the authors uploaded book section, add there whatever you want */}
              <img src={book.image} alt=""/>
              
            </div>
          )
        })}
     </div>
    </div>


  );
};

export default DeleteProfile;






