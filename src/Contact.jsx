import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faFile } from '@fortawesome/free-solid-svg-icons';


import '../style/contact.css'

// [] fill in resume
// [] make contact bar static so it shows up no matter where the user is? (could be bottom of the page or on the side)
// [] if you can do everything with the brand icons then delete the other two packages (font awesome)
// [ ] do accessibility course and make sure this page is accessible (maybe add an icon to further demonstrate that)
// [ ] on hover each icon grows

// https://github.com/FortAwesome/Font-Awesome/issues/14854

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
    link: '../assets/SpencerAttickPortfolio.pdf'
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