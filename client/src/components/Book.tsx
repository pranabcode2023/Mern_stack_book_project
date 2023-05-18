// import React from 'react'

//  const book = (props: { book: { _id: any; name: any; author: any; description: any; price: any; available: any; image: any } }) => {
//   const { _id,name, author, description, price, available, image } = props.book
//   return (
//     <div>
//       book
//       <img src={image} alt={name} />
//       <article> By {author}</article>
//       <h3>{name} </h3>
//       <p>{description} </p>
//       <h2>Euro{price} </h2>
//       <button>Update</button>
//       <button>Delete</button>
//     </div>
//   )
// }


// export default book;


import React from 'react';

interface BookProps {
  book: {
    _id: any;
    name: any;
    author: any;
    description: any;
    price: any;
    available: any;
    image: any;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  const { name, author, description, price, image } = book;

  return (
      <div className="card">
        <img src={image} alt={name} />
        <article>By {author}</article>
         <h3>{name}</h3>
         <p>{description}</p>
         <h2>Euro{price}</h2>
           <p><button>Update</button> </p>
           <p><button>Delete</button></p>
        </div>
    
  );
};

export default Book;
