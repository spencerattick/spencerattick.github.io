import React from 'react';
import '../style/techStack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNode, faCss3Alt, faReact, faJs, faGithub, faHtml5, faTrello, faJira, faSketch, faNpm, faMarkdown, faYarn, faGit } from '@fortawesome/free-brands-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';


// [] maybe give each a progress bar based on how well I know each thing?


const techStack = [
    {
        name: 'React',
        logo: faReact
    },
    {
        name: 'Yarn',
        logo: faYarn
    },
    {
        name: 'Javascript',
        logo: faJs
    },
    {
        name: 'CSS',
        logo: faCss3Alt
    },
    {
        name: 'Git',
        logo: faGit
    },
    {
        name: 'JIRA',
        logo: faJira
    },
    {
        name: 'Node',
        logo: faNode
    },
    {
        name: 'Github',
        logo: faGithub
    },
    {
        name: 'HTML5',
        logo: faHtml5
    },
    {
        name: 'Trello',
        logo: faTrello
    },
    {
        name: 'TypeScript',
        logo: faKeyboard
    },
    {
        name: 'Sketch',
        logo: faSketch
    },
    {
        name: 'npm',
        logo: faNpm
    },
    {
        name: 'Markdown',
        logo: faMarkdown
    }
];

export default function TechStack() {
    return (
        <div>
           <h2 id="tech-stack-h2">Tech Stack</h2>
            <div id="tech-stack">
                {techStack.map((tech) => 
                    <div    
                        className="techIconDiv"
                    key={tech.name} 
                    >
                         <FontAwesomeIcon 
                    className="techIcon" 
                    icon={tech.logo} /> 
                        <p className="hide">
                            {tech.name}
                        </p>

                    </div>
                   
                )}
            </div>
        </div>
     
    )
}