import React from 'react';
import '../style/techStack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNode, faCss3Alt, faReact, faJs, faGithub, faHtml5, faTrello, faJira, faSketch, faNpm, faMarkdown, faYarn, faGit } from '@fortawesome/free-brands-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';


// [] fill out techStack arr
// [] figure out how to store and render each logo
// [] maybe give each a progress bar based on how well I know each thing?
// [] on hover have icon grow/change color and display the name of the tech 


const techStack = [
    {
        name: 'react',
        logo: faReact
    },
    {
        name: 'yarn',
        logo: faYarn
    },
    {
        name: 'javascript',
        logo: faJs
    },
    {
        name: 'css',
        logo: faCss3Alt
    },
    {
        name: 'git',
        logo: faGit
    },
    {
        name: 'jira',
        logo: faJira
    },
    {
        name: 'node',
        logo: faNode
    },
    {
        name: 'github',
        logo: faGithub
    },
    {
        name: 'html',
        logo: faHtml5
    },
    {
        name: 'trello',
        logo: faTrello
    },
    {
        name: 'typescript',
        logo: faKeyboard
    },
    {
        name: 'sketch',
        logo: faSketch
    },
    {
        name: 'npm',
        logo: faNpm
    },
    {
        name: 'markdown',
        logo: faMarkdown
    }
];

export default function TechStack() {
    return (
        <div>
            <h2>TECH STACK</h2>
            <div id="tech-stack">
                {techStack.map((tech) => 
                    <div    className="techIconDiv"
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