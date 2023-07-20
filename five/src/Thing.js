import React from 'react';
import Sketch from 'react-p5';

const Thing = () => {
  let circles = [{ x: 250, y: 250, r: 10, color: null}];
  let currentCount = 1;
  const maxCount = 690;
  
  const palettes = [
    { bg: '245,245,245', colors: ['216,174,199', '230,205,172', '244,238,174', '176,223,185', '162,198,210'] },
    { bg: '34,31,32', colors: ['255,51,102', '255,153,51', '221,255,51', '51,255,187', '51,153,255'] },
    { bg: '8,28,36', colors: ['255,107,107', '255,223,107', '84,255,107', '107,227,255', '141,107,255'] }, 
    { bg: '15,76,92', colors: ['9,56,62', '219,202,142', '255,153,21', '255,92,51', '191,35,40'] },
    { bg: '0,43,54', colors: ['255,84,84', '255,172,84', '255,219,84', '212,255,84', '128,255,84'] },
    { bg: '42,87,141', colors: ['42,87,141', '28,123,153', '46,165,188', '72,205,220', '198,232,250'] },
    { bg: '254,209,182', colors: ['254,209,182', '229,238,190', '167,223,214', '162,196,254', '204,204,204'] },
    { bg: '235,236,240', colors: ['181,204,221', '135,192,234', '94,190,228', '78,205,196', '85,210,172'] }
  ];  

  const activePalette = palettes[Math.floor(Math.random() * palettes.length)];
  const colors = activePalette.colors;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(500, 500).parent(canvasParentRef);
    p5.strokeWeight(0.3);
    const bgColors = activePalette.bg.split(',').map(str => Number(str));
    p5.background(...bgColors);
    circles[0] = { 
      x: p5.width / 2, 
      y: p5.height / 2, 
      r: 10, 
      color: p5.random(colors)
    };
  };

  const draw = (p5) => {
    p5.clear();
    const bgColors = activePalette.bg.split(',').map(str => Number(str));
    p5.background(...bgColors);

    let newR = p5.random(1, 7);
    let newX = p5.random(newR, p5.width - newR);
    let newY = p5.random(newR, p5.height - newR);

    let closestDist = Number.MAX_VALUE;
    let closestIndex = 0;

    for (let i = 0; i < currentCount; i++) {
      let newDist = p5.dist(newX, newY, circles[i].x, circles[i].y);
      if (newDist < closestDist) {
        closestDist = newDist;
        closestIndex = i;
      }
    }

    let angle = p5.atan2(newY - circles[closestIndex].y, newX - circles[closestIndex].x);

    let nextX = circles[closestIndex].x + p5.cos(angle) * (circles[closestIndex].r + newR);
    let nextY = circles[closestIndex].y + p5.sin(angle) * (circles[closestIndex].r + newR);

    circles.push({ x: nextX, y: nextY, r: newR, color: p5.random(colors) });

    currentCount++;

    for (let i = 0; i < currentCount; i++) {
      p5.fill(`rgba(${circles[i].color}, 0.8)`);
      p5.drawingContext.shadowOffsetX = 0;
      p5.drawingContext.shadowOffsetY = 0;
      p5.drawingContext.shadowBlur = 10;
      p5.drawingContext.shadowColor = `rgba(${circles[i].color}, 0.5)`;
      p5.ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
    }

    if (currentCount >= maxCount) {
      p5.noLoop();
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Thing;
