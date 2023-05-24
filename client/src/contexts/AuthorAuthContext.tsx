import { ReactNode, createContext, useState, useEffect } from "react"


interface Author {
  email?: string,
  username: string,
  image: string,
  books: string[]
}

interface fetchResult{
  authorToken: string,
  verified: boolean,
  author: Author
}

interface fetchFailed{
  error: string 
}

interface AuthorAuthContextType {
  author: Author | null,
  error: Error | null,
  login(email: string, password: string): void,
  logout():void
}

// export const AuthContext = createContext<AuthContextType | null>(null); // not recommended
// export const AuthContext = createContext<AuthContextType>({} as AuthContextType); // less recommended
// export const AuthContext = createContext<AuthContextType>(null!); // less recommended

const initialAuth: AuthorAuthContextType = {
  author: null,
  error: null,
  login: () => {
    throw new Error('login not implemented.');
  },
  logout: () => {
    throw new Error('logout not implemented.');
  }
};

export const AuthorAuthContext = createContext<AuthorAuthContextType>(initialAuth);


 export const AuthorAuthContextProvider = ({ children }: { children: ReactNode }) => {
   const [author, setAuthor] = useState< Author | null>(null);
  //  console.log("active author:",author);
  const [error, setError] = useState<Error | null>(null);

  const login = async(email: string, password: string) => {
    // console.log({ email: email, password: password })
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/login`, requestOptions);
      console.log(response)
    
      if (response.ok) {
        const result = await response.json() as fetchResult
        if (result.author) {
        setAuthor(result.author);
        console.log(result.author)
        localStorage.setItem("token", result.authorToken);
        localStorage.setItem("my name", "pranab");
        }
         console.log(result);
      } else {
        const result = await response.json() as fetchFailed
        alert(result.error)
     }
      
     
    } catch (error) {
      console.log(error);
      // setError(error); //I still have to figure out how to type the unknown fetch results
      alert("Something went wrong - check console for error")
    }

  }
  
  const logout = () => {
    localStorage.removeItem("token");
    setAuthor(null);
   }
   
    const checkForToken = () => {
    const authorToken = localStorage.getItem("authorToken");
    if (authorToken) {
      console.log("There is a token")
      fetchActiveAuthor(authorToken);
    } else {
      console.log("There is no token")
     setAuthor(null)
    }
  }

   
   const fetchActiveAuthor = async (authorToken: string) => {
    const myHeaders = new Headers();
     myHeaders.append("Authorization", `Bearer ${authorToken}`);
     const requestOptions = {
         method: 'GET',
         headers: myHeaders,
};
     try {
       const response = await fetch(`${process.env.REACT_APP_BASE_URL}authors/active`, requestOptions);
       const result = await response.json();
       console.log("active author result:", result)
       setAuthor(result);
     } catch (error) {
       console.log(error);
     }
  }
   
   
   
  useEffect(() => {
    checkForToken();
  }, [])

return (
    <AuthorAuthContext.Provider value={{ author, login, logout, error }}>
      { children }
    </AuthorAuthContext.Provider>
  )
}



