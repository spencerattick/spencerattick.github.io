import React, { useEffect, useState } from 'react';
import '../style/blog.css';
import staticFeed from '../assets/staticMediumFeed.json';


export default function Blog() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);


//maybe refactor with regex?
const getImgURL = content => {
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

const getDate = time => {
  //remove three trailing 0s Medium sets in the timestamp
  const parsedTimestamp = time.toString().slice(0, -3);
  const date = new Date(parsedTimestamp * 1000).toDateString();
  const splitDate = date.split(' ');
  return `${splitDate[1]} ${splitDate[2]} ${splitDate[3]}`;
}


const getSixPostsOrMax = data => {
  let posts = [];

  for (let post of data) {
    if (posts.length === 6) {
      return posts;
    }
    if (!post.title.includes('Project')) {
      posts.push(post);
    }
  }
  return posts;
}



  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`http://localhost:3000/api/posts`);
        const data = await response.json();
        setBlogPosts(getSixPostsOrMax(data));
      } catch (error) {
        console.log(error)
        setBlogPosts(getSixPostsOrMax(staticFeed.items));
      }
    }
    fetchBlogPosts();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

    return (
        <div id="blog">
          <h2>Blog</h2>
          <div id="blog-posts">
            {blogPosts.length > 1 ? (blogPosts.map((post) => {
              const imgURL = getImgURL(post.content);
              const date = getDate(post.created);
              return (
                <div key={post.id} className="post">
                  <a 
                    href={post.id} 
                    target="_blank"
                  >
                    <img src={imgURL} alt={post.title} />
                    <p className="date">{date}</p>
                    <p>{post.title}</p>
                    
                  </a>
                </div>
              )
            })) : (
              <div>
                It looks like something went wrong. You can check out my blog here: <a href="https://medium.com/@spencer.attick">Spencer's Blog</a>.
              </div>
            )}
          </div>
        </div>
    )
}