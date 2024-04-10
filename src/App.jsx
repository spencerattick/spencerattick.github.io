import React from 'react';
import Intro from './Intro';
import AboutMe from './AboutMe';
import TechStack from './TechStack';
import Blog from './Blog';
import Contact from './Contact';
import Projects from './Projects';
import GoodReads from './GoodReads';
import Strava from './Strava';

// add movement that draws attention to important pieces of the site as you scroll

export default function App() {
    return (
        <div>
            <Intro />
            <AboutMe />
            <Projects />
            <TechStack />
            <Blog />
            <GoodReads />
            <Strava />
            <Contact />
        </div>
    )
}