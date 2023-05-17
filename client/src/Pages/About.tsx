import React from 'react'
import Books from '../components/Books'
import Book from '../components/Book'

export const About = () => {
  return (
    
    <div>About
      <Book book={{
        _id: undefined,
        name: undefined,
        author: undefined,
        description: undefined,
        price: undefined,
        available: undefined,
        image: undefined
      }}/>
      <Books/>
    </div>
  )
}
