import React, { useEffect, useState } from 'react';
import '../style/goodreads.css'

// [ ] on hover move book image up a bit and then display the started/read meta data
// [ ] add link to see more 
// [ ] need to handle serving the Wants to Read books too but should specifiy which is which
 
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
    //    console.log(data.items)
    } catch (error) {
      console.log(error)
      setError(error);
    }
  }

//   function getBookTitle(book) {
//     const title = book.title;
//     const parsedTitle = title.substring(title.indexOf("'") + 1, title.length - 1);

//     return parsedTitle;
//   }

  const getDate = time => {
    const parsedTimestamp = time.toString().slice(0, -3);
    const date = new Date(parsedTimestamp * 1000).toDateString();
    const splitDate = date.split(' ');
    return `${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;
  } 
  
  const textToDisplay = item => {
    let text;
    console.log(item)
    if (item.title.includes('wants to read')) {
      text = `added to list ${getDate(item.created)}`
    } if (item.title.includes('finished reading')) {
      text = `finished on ${getDate(item.created)}`
    } if (item.title.includes('started reading') || item.title.includes('currently reading')) {
      text = `started reading on ${getDate(item.created)}`
    }
    return text;
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
            <div id="goodreads-container">
                {goodReadsFeed.items ? (
                    goodReadsFeed.items.map((book, key) => {
                        const bookImg = getBookImg(book);
                        // const bookTitle = getBookTitle(book);
                        const text = textToDisplay(book);
                        return (
                        <div key={key} className="book-div">
                            <a href={book.link} target="_blank">
                                <img src={bookImg} alt="" />
                                <p>{text}</p>
                            </a>
                          
                        </div>
                        );
                    })
                    ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}