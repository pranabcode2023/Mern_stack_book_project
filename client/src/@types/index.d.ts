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
  image: image;
};

