type Avatar = string | File

type avatar = string | File


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

// interface SubmitUserRegisterData{
//  email: string,
//   password: string,
//   username: string,
//   avatar: Avatar
// }

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string[];
  avatar: File | string;
}


// type AddBookData = {
//   name: string;
//   description: string;
//   price: string;
//   user: string;
//   available: boolean;
//   avatar: avatar;
// };


type BookData = {
  _id: string;
  name: string;
  author: string;
  description: string;
  price: string;
  available: string;
  comments: CommentData[]; // Updated type to include CommentData interface
  avatar: File | string;
}


type CommentData = {
  user: string;
  text: string;
  _id: string;
}

