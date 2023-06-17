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
  _id: string;
  name: string;
  author: string;
  description: string;
  price: string;
  available: string;
  comments: CommentData[]; // Updated type to include CommentData interface
  image: File | string;
}


type CommentData = {
  author: string;
  text: string;
  _id: string;
}

