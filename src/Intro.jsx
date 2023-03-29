import React from 'react'
import '../style/intro.css'

// [ ] what is the difference between Into and About? have to look at some examples
// [ ] reduce the brightness of background image?

// this seems interesting: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_blurred_bg

//https://1stwebdesigner.com/15-css-background-effects/


export default function Intro() {
    return (
        <div id='intro'>
          <h1>
            <span className='underline'>
              SPENCER ATTICK
            </span>
          </h1>
          <h3>
            <span className='underline'>
              he/him
            </span>
          </h3>
          <p>
            <span className='underline'>
              Software Engineer
            </span>
          </p>
        </div>
    )
}