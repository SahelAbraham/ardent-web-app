import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Hero.css';

function Hero() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-6.mp4' autoPlay loop muted />
      <h2>ARDENT finds Answers</h2>
      <p>Get the latest research and clinical trials information on any Rare Disease</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
        >
          Try a Search!
        </Button>
      </div>
    </div>
  );
}

export default Hero;