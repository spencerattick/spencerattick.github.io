import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';


import '../style/contact.css'
import portfolio from '../assets/SpencerAttickPortfolio.pdf';

//[ ] make links accessible https://www.a11yproject.com/posts/creating-valid-and-accessible-links/

const contactMethods = [{
    method: 'email',
    icon: faEnvelope,
    link: 'mailto:spencer.attick@gmail'
  },{
    method: 'linkedin',
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/ryan-spencer-attick/'
  },
  {
    method: 'github',
    icon: faGithub,
    link: 'https://github.com/spencerattick'
  },
  {
    method: 'medium',
    icon: faMedium,
    link: 'https://medium.com/@spencer.attick'
  },
  {
    method: 'resume',
    icon: faFile,
    link: portfolio
  }];

export default function Contact() {
    return (
        <div id='contact'>
          {contactMethods.map((method) => 
             <a 
             href={method.link} 
             target="_blank"
             key={method.method}
             >
                 <FontAwesomeIcon  
                    className= "contactIcon" 
                    icon={method.icon} />
             </a>
            
          )}
        </div>
    )
}