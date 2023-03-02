import React, { useEffect, useState } from 'react';
import '../style/goodreads.css'

export default function GoodReads() {

  const [goodReadsFeed, setGoodReadsFeed] = useState([]);
//   const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchGoodReadsFeed();
  }, []);


  async function fetchGoodReadsFeed() {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/feed`);
      const data = await response.json();
      setGoodReadsFeed(data);
    } catch (error) {
      console.log(error)
      setError(error);
    }
  }

  function getBookTitle(book) {
    const title = book.title;
    const parsedTitle = title.substring(title.indexOf("'") + 1, title.length - 1);

    return parsedTitle;
  }

  function getBookImg(book) {
    const description = book.description;
    const start = description.indexOf('books/') + 5;
    const end =  description.indexOf('.jpg');

    const parsedImg = description.substring(start, end);

    const firstId = parsedImg.split('/')[1];
    const secondId = parsedImg.split('/')[2].split('.')[0];

    const imgURL = `https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${firstId}/${secondId}.jpg`;
    
    return imgURL;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
        <div id="goodreads">
            <h2>Currently Reading</h2>
            {goodReadsFeed.items ? (
                goodReadsFeed.items.map((book, key) => {
                    const bookImg = getBookImg(book);
                    const bookTitle = getBookTitle(book);
                    if (book.title.includes('wants to read')) {
                        return;
                    }
                    return (
                    <div key={key}>
                        <p>{bookTitle}</p>
                        <img src={bookImg} alt="" />
                    </div>
                    );
                })
                ) : (
                 <div>Loading...</div>
                )}
        </div>
    )
}