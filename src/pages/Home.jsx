import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroBanner from "../assets/heroBanner.webp";

const buttonStyle = {
  padding: '0.9rem 2.2rem',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '2rem',
  border: '2.5px solid #c89b3c', // doré LoL
  background: 'linear-gradient(90deg, #5ab0ff 0%, #1c2530 100%)',
  color: '#fff',
  textDecoration: 'none',
  boxShadow: '0 4px 18px 0 rgba(0,0,0,0.18)',
  cursor: 'pointer',
  transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
  margin: '0 0.5rem',
  letterSpacing: '1px',
  outline: 'none',
  fontFamily: "'Cinzel', serif"
};

function HomeButton({ to, children }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      style={{
        ...buttonStyle,
        transform: hover ? 'scale(1.07)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}

    </Link>
  );
}


export default function Home() {
  return (
    <section
      className="home-container"
      style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        minHeight: '80vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${heroBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0,0,0,0.15)',
        fontFamily: "'Cinzel', serif"
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          color: '#fff',
          textShadow:
            '0 2px 8px #000, 0 0 2px #c89b3c, 0 0 6px #c89b3c, 1px 1px 0 #c89b3c, -1px -1px 0 #c89b3c, 1px -1px 0 #c89b3c, -1px 1px 0 #c89b3c'
        }}
      >
        Bienvenue sur League of Legends Explorer
      </h1>
      <p style={{fontSize: '1.2rem', marginBottom: '2rem', textShadow: '0 1px 6px #000'}}>
        Découvrez les champions, les régions et testez vos connaissances sur l'univers de League of Legends !
      </p>
      <div style={{display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap'}}>
        <HomeButton to="/champions">Champions</HomeButton>
        <HomeButton to="/regions">Régions</HomeButton>
        <HomeButton to="/quiz">Quiz</HomeButton>
      </div>
    </section>
  );
}
