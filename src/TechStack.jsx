import React from 'react';
import '../style/techStack.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNode, faCss3Alt, faReact, faJs, faGithub, faHtml5, faTrello, faJira, faSketch, faNpm, faMarkdown, faYarn, faGit } from '@fortawesome/free-brands-svg-icons';
import { faKeyboard, faMugHot } from '@fortawesome/free-solid-svg-icons';


// [] maybe give each a progress bar based on how well I know each thing?


const techStack = [
    {
        name: 'React',
        logo: faReact,
        link: 'https://react.dev/'
    },
    {
        name: 'Yarn',
        logo: faYarn,
        link: 'https://classic.yarnpkg.com/lang/en/'

    },
    {
        name: 'Javascript',
        logo: faJs,
        link: 'https://www.javascript.com/'
    },
    {
        name: 'CSS',
        logo: faCss3Alt,
        link: 'https://developer.mozilla.org/en-US/docs/Web/CSS'
    },
    {
        name: 'Git',
        logo: faGit,
        link: 'https://git-scm.com/'
    },
    {
        name: 'JIRA',
        logo: faJira,
        link: 'https://www.atlassian.com/software/jira'
    },
    {
        name: 'Node',
        logo: faNode,
        link: 'https://nodejs.org/en'
    },
    {
        name: 'Github',
        logo: faGithub,
        link: 'https://github.com/'
    },
    {
        name: 'HTML5',
        logo: faHtml5,
        link: 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'
    },
    {
        name: 'Trello',
        logo: faTrello,
        link: 'https://www.atlassian.com/software/trello'
    },
    {
        name: 'TypeScript',
        logo: faKeyboard,
        link: 'https://www.typescriptlang.org/'
    },
    {
        name: 'Sketch',
        logo: faSketch,
        link: 'https://www.sketch.com/'
    },
    {
        name: 'Mocha',
        logo: faMugHot,
        link: 'https://mochajs.org/'
    },
    {
        name: 'npm',
        logo: faNpm,
        link: 'https://npmjs.com/'
    },
    {
        name: 'Markdown',
        logo: faMarkdown,
        link: 'https://www.markdownguide.org/'
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
                        <a href={tech.link} target='_blank'>
                            <FontAwesomeIcon 
                        className="techIcon" 
                        icon={tech.logo} /> 
                            <p className="hide">
                                {tech.name}
                            </p>
                        </a>
                  
                    </div>
                   
                )}
            </div>
        </div>
     
    )
}