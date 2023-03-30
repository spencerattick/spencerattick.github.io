import React from 'react';
import '../style/aboutMe.css';
import aboutMeImg from '../assets/aboutMe.png'

// [] read some advice on writing About Mes
//maybe another section of like three icons that represent stuff about me? (life longer learner, hardworker, etc?)
// [] toggle between dark and light mode
// [ ] https://www.goodreads.com/user/show/104822881-spencer-attick SEE IF YOU CAN FIND AN RSS FEED  - this is the link to my profile (maybe this https://www.goodreads.com/user/updates_rss/104822881)

export default function AboutMe() {
    return (
        <div id='about-me'>

          <p>
          <img src={aboutMeImg} alt="Spencer wearing sunglasses sitting with his dog - a Doberman Shephard mix" />
            Hi, I'm Spencer! I have a passion
             for writing great code and solving technical problems. I've worked in the tech industry for over four years now and have learned a ton along the way. Keep scrolling to take a look at what I've been up to!
          </p>
        </div>
    )
}