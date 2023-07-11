import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import UpdateProfile from "../components/Profile/UpdateProfile";
import DeleteProfile from "../components/Profile/DeleteProfile";

type Props = {};

const UserProfile = (props: Props) => {
  const { loading, setLoading } = useContext(AuthContext);

  return (
    <div className="parent-div">
      <div className="page-container">
        <UpdateProfile />
        <hr />
        <DeleteProfile />
      </div>
    </div>
  );
};

export default UserProfile;


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
//   avatar: File | string;
// }

// const UserProfile: React.FC = () => {
//   const [deleteProfile, setDeleteProfile] = useState<ProfileData | null>(null);
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

//   const profileDelete = async () => {
//     if (user) {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_BASE_URL}users/id/${user._id}`
//         );
//         const result = await response.json();
//         setDeleteProfile(result);
//       } catch (error) {
//         console.log("error getting user profile", error);
//       }
//     }
//   };

//   useEffect(() => {
//     profileDelete();
//   }, [user]);

//   return (
//     <div className="books-container">
//       {deleteProfile && (
//         <Card style={{ width: "40rem" }}>
//           <h1>Profile Info</h1>
//           <Card.Body>
//             <DeleteProfile profile={deleteProfile} />

//             {/* <Button variant="primary">Edit Profile</Button>
//              <Card.Title>{userProfile.username}</Card.Title>
//             <Card.Text>{userProfile.email}</Card.Text>
//             <Button variant="primary">Edit Profile</Button> */}
//           </Card.Body>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
