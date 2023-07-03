import React, { useState } from "react";
import { Link } from "react-router-dom";

interface BookProps {
  book: {
    _id: any;
    name: any;
    user: any;
    description: any;
    price: any;
    available: any;
    comments: CommentData[];
    avatar: any;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  const { _id, name, user, description, price, comments, avatar } = book;
  console.log(book);

  const [inputValue, setInputValue] = useState("");

  const handleAddComment = async () => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("delete", "6478a7666ded9683ca1be2c2");
    urlencoded.append("user", "64707630309ba87cafe941ee");

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: inputValue,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/commentsbook/${_id}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      alert("Successfull! Check console.");
      setInputValue("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console.");
    }
  };

  const handleDeleteComment = async () => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        text: inputValue,
      }),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/commentsbook/${_id}`,
        requestOptions
      );
      const result = await response.json();
      console.log("result", result);
      alert("Successfull! Check console.");
      setInputValue("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong - check console.");
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/deleteBook/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Refresh the page after deleting the item
        window.location.reload();
      } else {
        console.log("Error deleting book:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="bookCard">
        <div className="container">
          <img src={avatar} alt={name} />
        </div>
        <div className="container">
          <article>User Name: {user}</article>
          <h3> Book Name: {name}</h3>
          <h3>Book Description : {description}</h3>
          <h2>Price : {price} €</h2>
        </div>

        <div className="container">
          <Link to={`/books/${_id}`}>
            <button>Update</button>
          </Link>
        </div>

        <div className="container">
          <button onClick={deleteHandler}>Delete</button>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddComment();
          // console.log(e.target);
        }}
      >
        <div>
          <input
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            type="text"
            placeholder="Add a comment..."
            value={inputValue}
          />
          <button type="submit">Add Comment</button>
        </div>
      </form>

      <div>
        {comments.map((comment) => {
          return (
            <div key={comment._id}>
              <p>{comment.user}</p>
              <p>{comment.text} </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Book;
