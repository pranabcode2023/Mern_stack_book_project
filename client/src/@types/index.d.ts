type Avatar = string | File

type image = string | File


interface SubmitRegisterData {
  email: string,
  password: string,
  username: string,
  avatar: Avatar
}

interface SubmitLoginData {
  email: string,
  password: string,
}

interface SubmitAuthorRegisterData{
 email: string,
  password: string,
  username: string,
  image: Image
}

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string[];
  image: File | string;
}


type AddBookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  image: image;
};



type BookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  comments: [];
  image: image;
};


// type Book= {
//     name: string;
//     author: string;
//     description: string;
//     price: string;
//   available: string;
//    image: File | string;
// };

interface CommentData {
  _id: String,
  author: String,
  text: String,
  createdAt: Date,
 
}



