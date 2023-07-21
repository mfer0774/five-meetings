import React, { useEffect, useRef, useState } from 'react';

const Thing = () => {
  const palettes = [
    { bg: '245,245,245', colors: ['rgb(216,174,199)', 'rgb(230,205,172)', 'rgb(244,238,174)', 'rgb(176,223,185)', 'rgb(162,198,210)'] },
    { bg: '34,31,32', colors: ['rgb(255,51,102)', 'rgb(255,153,51)', 'rgb(221,255,51)', 'rgb(51,255,187)', 'rgb(51,153,255)'] },
    { bg: '8,28,36', colors: ['rgb(255,107,107)', 'rgb(255,223,107)', 'rgb(84,255,107)', 'rgb(107,227,255)', 'rgb(141,107,255)'] }, 
    { bg: '15,76,92', colors: ['rgb(9,56,62)', 'rgb(219,202,142)', 'rgb(255,153,21)', 'rgb(255,92,51)', 'rgb(191,35,40)'] },
    { bg: '0,43,54', colors: ['rgb(255,84,84)', 'rgb(255,172,84)', 'rgb(255,219,84)', 'rgb(212,255,84)', 'rgb(128,255,84)'] },
    { bg: '42,87,141', colors: ['rgb(38,79,128)', 'rgb(28,123,153)', 'rgb(46,165,188)', 'rgb(72,205,220)', 'rgb(198,232,250)'] },
    { bg: '232,197,152', colors: ['rgb(210,80,60)', 'rgb(227,112,93)', 'rgb(91,132,173)', 'rgb(40,67,87)', 'rgb(234,226,94)'] },
    { bg: '235,236,240', colors: ['rgb(181,204,221)', 'rgb(135,192,234)', 'rgb(94,190,228)', 'rgb(78,205,196)', 'rgb(85,210,172)'] }
  ];

  const [circles, setCircles] = useState([{ x: 250, y: 250, r: 10, color: '#ccc'}]);
  const [currentCount, setCurrentCount] = useState(1);
  const [activePalette, setActivePalette] = useState(palettes[0]);
  const [colors, setColors] = useState();
  const svgRef = useRef(null);
  const maxCount = 690;

  function estimateSVGSize(svgElement) {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    return svgString.length;
  }

  useEffect(() => {
    const activePalette = palettes[Math.floor(Math.random() * palettes.length)];
    const colors = activePalette.colors;

    setActivePalette(activePalette);
    setColors(colors);

    setCircles([{ 
      x: 250, 
      y: 250, 
      r: 10, 
      colorIndex: Math.floor(Math.random() * colors.length)
    }]);
  }, []); 
  
  useEffect(() => {
    function draw() {
      let newR = Math.random() * 6 + 1;
      let newX = Math.random() * (500 - newR) + newR;
      let newY = Math.random() * (500 - newR) + newR;
      
      let closestDist = Number.MAX_VALUE;
      let closestIndex = 0;
  
      for (let i = 0; i < currentCount; i++) {
        let dx = newX - circles[i].x;
        let dy = newY - circles[i].y;
        let newDist = Math.sqrt(dx*dx + dy*dy);
        if (newDist < closestDist) {
          closestDist = newDist;
          closestIndex = i;
        }
      }      

      let angle = Math.atan2(newY - circles[closestIndex].y, newX - circles[closestIndex].x);
      
      let nextX = circles[closestIndex].x + Math.cos(angle) * (circles[closestIndex].r + newR);
      let nextY = circles[closestIndex].y + Math.sin(angle) * (circles[closestIndex].r + newR);

      const newCircles = [...circles, { x: nextX, y: nextY, r: newR, colorIndex: Math.floor(Math.random() * colors.length) }];

      setCircles(newCircles);
      setCurrentCount(currentCount + 1);
    }

    if (currentCount < maxCount) {
      const interval = setInterval(draw, 10);
      return () => clearInterval(interval);
    }
  }, [circles, currentCount, activePalette, colors]);

  useEffect(() => {
    if (currentCount >= maxCount) {
      const svgSize = estimateSVGSize(svgRef.current);
      console.log("estimated SVG size in bytes: ", svgSize);
    }
  }, [currentCount]);
  
  return (
    <svg ref={svgRef} width="500" height="500" style={{backgroundColor: `rgb(${activePalette.bg})`}}>
      <defs>
        {colors && colors.map((color, index) => (
          <linearGradient id={`gradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: color, stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: color, stopOpacity: 0.6}} />
          </linearGradient>
        ))}
      </defs>
      {circles.map((circle, index) => (
        <circle key={index} cx={circle.x} cy={circle.y} r={circle.r} fill={`url(#gradient${circle.colorIndex})`} />
      ))}
    </svg>
  );
};

export default Thing;


