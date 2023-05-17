import React from 'react'

 const book = (props: { book: { _id: any; name: any; author: any; description: any; price: any; available: any; image: any } }) => {
  const { _id,name, author, description, price, available, image } = props.book
  return (
    <div>
      book
      <img src={image} alt={name} />
      <article> By {author}</article>
      <h3>{name} </h3>
      <p>{description} </p>
      <h2>Euro{price} </h2>
      <button>Update</button>
      <button>Delete</button>
    </div>
  )
}


export default book;