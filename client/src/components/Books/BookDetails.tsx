import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

type BookData = {
  name: string;
  description: string;
  price: string;
  user: string;
  available: boolean;
  avatar: File | string;
};

const BookDetails = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<BookData>({
    name: "",
    description: "",
    price: "",
    user: "",
    available: false,
    avatar: "",
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}books/all/${id}`
        );
        const data = await response.json();
        const bookData = data.book;
        setFormData(bookData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, avatar: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("user", formData.user);
      submitData.append("available", String(formData.available));
      submitData.append("avatar", formData.avatar);

      const requestOptions = {
        method: "PUT",
        body: submitData,
      };

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/updatebook/${id}`,
        requestOptions
      );
      if (response.ok) {
        navigate("/books");
        alert("Book updated successfully.");
      } else {
        throw new Error("Failed to update the book.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update the book.");
    }
  };

  return (
    <div className="bookDetails">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Book Details</div>

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={formData.user}
            onChange={handleChange}
            name="author"
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={handleFile} name="image" />
        </div>

        <div className="input-container">
          <label htmlFor="available">Available</label>
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={handleChange}
            name="available"
          />
        </div>

        <div className="button-container">
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookDetails;
