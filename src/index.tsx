import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
const ball = require('./ball2.jpg')
const squareGreen = require('./square-green.jpg')

const easeInOutQuad = (t: number) => t<.5 ? 2*t*t : -1+(4-2*t)*t 
const easeOutSine = (t: number) => Math.sin(t * Math.PI / 2)

const App = (props: {}) => {
  const [secs, setSecs] = useState(0)
  const requestRef = React.useRef<number>()
  const startTime = React.useRef<number>()

  const [mode, setMode] = useState(0)
  
  const animate = (time: number) => {
    if (!startTime.current) {
      startTime.current = time
    }

    setSecs((time - startTime.current) / 1000)

    // The 'state' will always be the initial value here
    requestRef.current = requestAnimationFrame(animate);
  }
    
  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []); 

  const speed = mode == 0 ? 1 : 3

  let size = 0
  let phase = (secs * speed) % 19
  if (phase < 4) {
    size = easeOutSine(phase / 4)
  }
  else if (phase < 11) {
    size = 1
  }
  else {
    size = 1 - ((phase - 11) / 8)
  }

  return <div onClick={() => setMode((mode + 1) % 2)}>
    {/* <div style={{ color: "white"}}>{phase}</div> */}
    <img src={mode == 0 ? ball : squareGreen} className="ball" style={{ width: `${size * 50 + 50}%`, opacity: (size * 0.8 + 0.2) }}/>
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'));