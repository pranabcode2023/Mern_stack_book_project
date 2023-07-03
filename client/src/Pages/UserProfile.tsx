// import React, { useContext, useEffect, useState } from "react";
// import { Card, Button } from "react-bootstrap";
// import DeleteProfile from "../components/Profile/DeleteProfile";
// import { AuthContext } from "../contexts/AuthContext";

// const URL = `${process.env.REACT_APP_BASE_URL}users/all`;

// interface ProfileData {
//   _id: string;
//   email: string;
//   username: string;
//   books: string[];
//   image: File | string;
// }

// const UserProfile: React.FC = () => {
//   const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
//   const { user } = useContext(AuthContext);

//   const fetchURL = async () => {
//     try {
//       const response = await fetch(URL);
//       if (response.ok) {
//         const data = await response.json();
//         return { profiles: data };
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   const getUserProfile = async () => {
//     if (user) {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_BASE_URL}users/id/${user._id}`
//         );
//         const result = await response.json();
//         setUserProfile(result);
//       } catch (error) {
//         console.log("error getting user profile", error);
//       }
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, [user]);

//   return (
//     <div className="books-container">
//       {userProfile && (
//         <Card style={{ width: "40rem" }}>
//           <h1>Profile Info</h1>
//           <Card.Body>
//             {/* <Button variant="primary">Edit Profile</Button> */}
//             <DeleteProfile profile={userProfile} />
//             {/* <Card.Title>{userProfile.username}</Card.Title> */}
//             {/* <Card.Text>{userProfile.email}</Card.Text> */}
//             {/* <Button variant="primary">Edit Profile</Button> */}
//           </Card.Body>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default UserProfile;

import React, { useContext, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import DeleteProfile from "../components/Profile/DeleteProfile";
import { AuthContext } from "../contexts/AuthContext";

const URL = `${process.env.REACT_APP_BASE_URL}users/all`;

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string[];
  avatar: File | string;
}

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<ProfileData | null>(null);
  const { user } = useContext(AuthContext);

  const fetchURL = async () => {
    try {
      const response = await fetch(URL);
      if (response.ok) {
        const data = await response.json();
        return { profiles: data };
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getUserProfile = async () => {
    if (user) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}users/id/${user._id}`
        );
        const result = await response.json();
        setUserProfile(result);
      } catch (error) {
        console.log("error getting user profile", error);
      }
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [user]);

  return (
    <div className="books-container">
      {userProfile && (
        <Card style={{ width: "40rem" }}>
          <h1>Profile Info</h1>
          <Card.Body>
            {/* <Button variant="primary">Edit Profile</Button> */}
            <DeleteProfile profile={userProfile} />
            {/* <Card.Title>{userProfile.username}</Card.Title> */}
            {/* <Card.Text>{userProfile.email}</Card.Text> */}
            {/* <Button variant="primary">Edit Profile</Button> */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
