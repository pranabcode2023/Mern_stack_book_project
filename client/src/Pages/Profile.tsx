import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile/profiledelete';



const URL = `${process.env.REACT_APP_BASE_URL}authors/all`;

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string;
  image: File | string;
}

const fetchHandler = async () => {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      return { profiles: data }; // Wrap the data in an object with the 'profiles' key
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  useEffect(() => {
    fetchHandler().then((data: { profiles: ProfileData[] } | null) => {
      if (data && data.profiles) {
        setProfiles(data.profiles);
      }
    });
  }, []);

  console.log(profiles);

  return (
    <div className='books-container'>
      {profiles.map((profile: ProfileData, i: number) => (
        <div className='book' key={i}>
          <Profile profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default Profiles;


// import React, { useEffect, useState } from 'react';


// type Props = {};

// interface Author {
//   id: string;
//   email: string;
//   username: string;
//   password: string;
//   image: string;
// }

// type Authors = Author[];

// const AuthorProfile = (props: Props) => {
//   const [authors, setAuthors] = useState<Authors>([]);
//   const [author, setAuthor] = useState<Author | null>(null);
//   const [error, setError] = useState(false);

//   const getAuthors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/authors/all");
//       const result = await response.json();
//       if (!response.ok) {
//         setError(result.error);
//       } else {
//         setAuthors(result);
//       }
//       console.log('response', response);
//       console.log('result', result);

//       console.log("all authors:", result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAuthorById = async () => {
//     const id = "646dfa8030ddfa257e002bd1";
//     try {
//       const response = await fetch(`http://localhost:5000/api/authors/id/${id}`);
//       const result = await response.json();
//       console.log("single author:", result);
//       setAuthor(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAuthors();
//     getAuthorById();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>All authors:</h2>

//         {authors &&
//           authors.map((author, i) => {
//             return (
//               <p key={i}>
//                 {author.username}
//                 <br />
//                 {author.email}
//                 <br />
//                 {author.password}
//                  <br />
//                  {author.image}
//               </p>
//             );
//           })}
//       </div>

     
//     </div>
//   );
// };

// export default AuthorProfile;
