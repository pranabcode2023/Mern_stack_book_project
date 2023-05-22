// import { FormEvent, useState } from 'react'
// import { useGet } from '../hooks/useGet'

// type Props = {}

// const Homepage2 = (props: Props) => {
//   const [inputValue, setInputValue] = useState("");
//   const [emailToSearch, setEmailToSearch] = useState("");

//   const { data: users, loading: usersLoading, error: usersError } = useGet<Users>("http://localhost:5000/api/users/all", true);
//   const { data: searchResult, loading: searchLoading, error: searchError, clear } = useGet<User>(`http://localhost:5000/api/users/email/${emailToSearch}`, false);

//   const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setEmailToSearch(inputValue);
//   }

//   { return usersLoading ? <p>Loading...</p> : searchLoading ? <p>Loading...</p> :
//     <div>
//       <h1>Homepage2</h1>
//       <h2>All users:</h2>
//       { usersError && <h1>Error: { usersError }</h1> }
//       { users && users.map((user, i) => {
//         return <p key={i}>{user.username}</p>
//       }) }
//       <h2>Search user by Email: </h2>
//       <form onSubmit={handleSubmit}>
//         <input type='email' placeholder='Enter an email' onChange={(e) => setInputValue(e.target.value)}/>
//         <button type='submit'>Search</button>
//         <button onClick={clear}>Clear</button>
//       </form>
     
//       { searchError && <h1>Error: { searchError }</h1> }
//       { searchResult &&
//         <div>
//           <p>{searchResult.username}</p>
//           <img src={searchResult.avatar} style={{ width: "100px", height: "auto" }} />
//         </div>
//       }
//     </div>
//  }
// }

// export default Homepage2

import React from 'react'

export const Homepage2 = () => {
  return (
    <div>Homepage2</div>
  )
}
