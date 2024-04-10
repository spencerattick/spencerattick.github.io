import React, { useEffect, useState } from 'react';
import '../style/goodreads.css'
import staticFeed from '../assets/staticGoodreadsFeed.json';

// [ ] on hover move book image up a bit and then display the started/read meta data
// [ ] add link to see more 
// [ ] need to handle serving the Wants to Read books too but should specifiy which is which
// [ ] check to make sure the alt text is coming through correctly 

 
export default function GoodReads() {

  const [goodReadsFeed, setGoodReadsFeed] = useState([]);
//   const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchGoodReadsFeed();
  }, []);


  const fetchGoodReadsFeed = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/feed`);
      const data = await response.json();
      setGoodReadsFeed(data);
    } catch (error) {
      console.log(error)
      setGoodReadsFeed(staticFeed);
      // setError(error);
    }
  }

  const getDate = time => {
    const parsedTimestamp = time.toString().slice(0, -3);
    const date = new Date(parsedTimestamp * 1000).toDateString();
    const splitDate = date.split(' ');
    return `${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;
  } 
  
  const textToDisplay = item => {
    let text;
    if (item.title.includes('wants to read')) {
      text = `added to list ${getDate(item.created)}`
    } else if (item.title.includes('finished reading') || item.title.includes('has read') || item.title.includes('Spencer added')) {
      text = `finished on ${getDate(item.created)}`
    } else if (item.title.includes('started reading') || item.title.includes('currently reading')) {
      text = `started reading on ${getDate(item.created)}`
    }
    return text;
  }
  

  const getBookImg = book => {
    const description = book.description;
    const start = description.indexOf('books/') + 5;
    const end =  description.indexOf('.jpg');

    const parsedImg = description.substring(start, end);

    const firstId = parsedImg.split('/')[1];
    const secondId = parsedImg.split('/')[2].split('.')[0];

    const imgURL = `https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/${firstId}/${secondId}.jpg`;

    return imgURL;
  }

  const getBookTitle = title => {
    title = title.substring(title.indexOf("'") + 1);
    title = title.slice(0, -1);
    return title;
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
                        const bookTitle = getBookTitle(book.title);
                        const text = textToDisplay(book);
                        return (
                        <div key={key} className="book-div">
                            <a href={book.link} target="_blank">
                                <img src={bookImg} alt={bookTitle} />
                                <p>{text}</p>
                            </a>
                          
                        </div>
                        );
                    })
                    ) : (
                    <div>
                      It looks like something went wrong. You can see what I'm reading here: <a href="https://www.goodreads.com/user/show/104822881-spencer-attick">Goodreads Feed</a>.
                    </div>
                )}
            </div>
        </div>
    )
}