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
type AddBookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  image: File | string;
};



interface BookData {
  _id: String,
  name: String,
  author: String,
  description: String,
  price: String,
  available: String,
  image: File | string
};

type UpdateBookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  image: File | string;
};
