import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface User {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  books: [];
  role: string;
}
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  error: Error | null;
  login(email: string, password: string): void;
  logout(): void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface AuthContextType {
  user: User | null;
  error: Error | null;
  login(email: string, password: string): void;
  logout(): void;
}

// export const AuthContext = createContext<AuthContextType | null>(null); // not recommended
// export const AuthContext = createContext<AuthContextType>({} as AuthContextType); // less recommended
// export const AuthContext = createContext<AuthContextType>(null!); // less recommended

const initialAuth: AuthContextType = {
  user: null,
  setUser: () => {
    throw new Error("setUser function not implemented.");
  },

  error: null,
  login: () => {
    throw new Error("login not implemented.");
  },
  logout: () => {
    throw new Error("logout not implemented.");
  },
  loading: false,
  setLoading: function (loading: boolean): void {
    throw new Error("Function not implemented.");
  },
};

export const AuthContext = createContext<AuthContextType>(initialAuth);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // console.log("active user:", user);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // console.log({ email: email, password: password })
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/login`,
        requestOptions
      );
      console.log(response);

      if (response.ok) {
        const result = await response.json();
        // console.log('restult >>>>', result)
        if (result.user) {
          setUser(result.user);
          // console.log("user login function", result.user)
          localStorage.setItem("token", result.token);
          localStorage.setItem("my name", "pranab");
        }
        console.log(result);
      } else {
        const result = await response.json();
        alert(result.error);
      }
    } catch (error) {
      console.log(error);
      setError(null); //I still have to figure out how to type the unknown fetch results
      alert("Something went wrong - check console for error");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const checkForToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("There is a token");
      fetchActiveUser(token);
    } else {
      console.log("There is no token");
      setUser(null);
    }
  }, []);

  const fetchActiveUser = async (token: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}users/active`,
        requestOptions
      );

      const result = await response.json();
      //  console.log("active author result:", result)
      setUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkForToken();
  }, [checkForToken]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, error, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// import { ReactNode, createContext, useState, useEffect } from "react";

// interface Author {
//   _id: string;
//   email?: string;
//   username: string;
//   image: string;
//   books: string[];
// }

// interface fetchResult {
//   authorToken: string;
//   verified: boolean;
//   author?: Author;
//   user?: Author;
// }

// interface fetchFailed {
//   error: string;
// }

// interface AuthContextType {
//   author: Author | null;
//   error: Error | null;
//   login(email: string, password: string): void;
//   logout(): void;
// }

// // export const AuthContext = createContext<AuthContextType | null>(null); // not recommended
// // export const AuthContext = createContext<AuthContextType>({} as AuthContextType); // less recommended
// // export const AuthContext = createContext<AuthContextType>(null!); // less recommended

// const initialAuth: AuthContextType = {
//   author: null,
//   error: null,
//   login: () => {
//     throw new Error("login not implemented.");
//   },
//   logout: () => {
//     throw new Error("logout not implemented.");
//   },
// };

// export const AuthContext = createContext<AuthContextType>(initialAuth);

// export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [author, setAuthor] = useState<Author | null>(null);
//   console.log("active author:", author);
//   const [error, setError] = useState<Error | null>(null);

//   const login = async (email: string, password: string) => {
//     // console.log({ email: email, password: password })
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

//     const urlencoded = new URLSearchParams();
//     urlencoded.append("email", email);
//     urlencoded.append("password", password);
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: urlencoded,
//     };
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}authors/login`,
//         requestOptions
//       );
//       // console.log(response)

//       if (response.ok) {
//         const result = (await response.json()) as fetchResult;
//         // console.log('restult >>>>', result)
//         if (result.user) {
//           setAuthor(result.user);
//           // console.log("author login function", result.user)
//           localStorage.setItem("token", result.authorToken);
//           localStorage.setItem("my name", "pranab");
//         }
//         //  console.log(result);
//       } else {
//         const result = (await response.json()) as fetchFailed;
//         alert(result.error);
//       }
//     } catch (error) {
//       console.log(error);
//       // setError(error); //I still have to figure out how to type the unknown fetch results
//       alert("Something went wrong - check console for error");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setAuthor(null);
//   };

//   const checkForToken = () => {
//     const authorToken = localStorage.getItem("token");
//     if (authorToken) {
//       console.log("There is a token");
//       fetchActiveAuthor(authorToken);
//     } else {
//       console.log("There is no token");
//       setAuthor(null);
//     }
//   };

//   const fetchActiveAuthor = async (authorToken: string) => {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${authorToken}`);
//     const requestOptions = {
//       method: "GET",
//       headers: myHeaders,
//     };
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}authors/active`,
//         requestOptions
//       );
//       const result = await response.json();
//       //  console.log("active author result:", result)
//       setAuthor(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     checkForToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ author, login, logout, error }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
