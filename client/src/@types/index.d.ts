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

interface BookData {
  _id: String,
  name: String,
  author: String,
  description: String,
  price: String,
  available: String,
  image: String
}