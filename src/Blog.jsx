import React, { useEffect, useState } from 'react';
import '../style/blog.css';


// [] design each component that will display this information
// [] maybe work it out so that a randomized 6 articles display?
// [] refactor all functions to arrow


export default function Blog() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);


//maybe refactor with regex?
function getImgURL(content) { 
  let dataParsed = content.split('<');
  let lineWithImg;
  let imgURL;
   for (const line of dataParsed) {
     if (line.includes('cdn-images')) {
       lineWithImg = line;
       for (const item of lineWithImg.split('=')) {
         if (item.includes('cdn-images')) {
           imgURL = item.split(' ')[0];
           break;
         }
       }
       //format URL to remove extra quotes
       return imgURL.replace(/"/g, '');
     }
   }
}


function getDate(time) {
  //remove three trailing 0s Medium sets in the timestamp
  const parsedTimestamp = time.toString().slice(0, -3);
  const date = new Date(parsedTimestamp * 1000).toDateString();
  const splitDate = date.split(' ');
  return `${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;
} 

const getSixRandomPostsOrMax = (data) => {
  let sixRandom = [];
  let random;

  if (data.length <= 6) {
    sixRandom = data;
  } else {
    while (sixRandom.length < 6) {
      random = Math.floor(Math.random() * data.length - 1);
      if (data[random] === undefined) {
        continue;
      }
      sixRandom.push(data[random]);
      data.splice(random, 1);
    }
  }
  return sixRandom;
}



  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`);
        const data = await response.json();
        setBlogPosts(getSixRandomPostsOrMax(data));
      } catch (error) {
        console.log(error)
        setError(error);
      }
    }
    fetchBlogPosts();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
        <div id="blog">
          <h2>BLOG</h2>
          <div id="blog-posts">
            {blogPosts.length > 1 ? (blogPosts.map((post) => {
              const imgURL = getImgURL(post.content);
              const date = getDate(post.created);
              return (
                <div key={post.id} className="post">
                  <a href={post.id} target="_blank">
                    <img src={imgURL} alt="" />
                    <p className="date">{date}</p>
                    <p>{post.title}</p>
                    
                  </a>
                </div>
              )
            })) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
    )
}