import React, { useEffect, useState } from 'react';
import '../style/projects.css';
import staticFeed from '../assets/staticMediumFeed.json';

//[] https://freefrontend.com/css-cards/ see if either the projects or the blogs can be spiced up with anything there
//[] remove the word 'project' from the project titles




export default function Projects() {
  const [projectPosts, setProjectPosts] = useState([]);
  const [error, setError] = useState(null);

  const getProjectPosts = data => {
    let projects = [];

    for (let post of data) {
      // if (post.title.includes('Project:')) {
        projects.push(post);
      // }
    }
    return projects;
  }

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`);
        const data = await response.json();
        setProjectPosts(getProjectPosts(data));
      } catch (error) {
        console.log(error)
        setProjectPosts(getProjectPosts(staticFeed.items));
        // setError(error);
      }
    }
    fetchBlogPosts();
  }, []);

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


    return (
        <div id="projects">
          <h2>Projects</h2>
          <div id='posts-container'>
            {projectPosts.length > 0 ? (projectPosts.map((post) => {
                const postImg = getImgURL(post.content);
                return (
                  <div key={post.id} className='post'>
                    <a href={post.id} target="_blank">
                      <img src={postImg} alt="" />
                      <p>
                      <span>
                      {post.title}
                      </span>
                      </p>
                    </a>
                  </div>
                )
              })
            ) : (
              <div>
                The server appears to be down at the moment. You can check out my projects here: <a href="https://medium.com/@spencer.attick">Spencer's Blog</a>.
              </div>
            )}
          </div>

        </div>
    )
}