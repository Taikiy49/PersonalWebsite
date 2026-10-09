import React, { useState, useEffect } from 'react';
import { FaTerminal, FaPlay } from 'react-icons/fa';
import '../styles/Terminal.css';

const commands = [
    {
      input: "whoami",
      output: "taiki@geolabs:~$ Software Engineer & AI Enthusiast"
    },
    {
      input: "ls -la ~/skills",
      output: `total 42
drwxr-xr-x  8 taiki taiki 4096 Dec 15 2024 .
drwxr-xr-x  3 taiki taiki 4096 Dec 15 2024 ..
-rw-r--r--  1 taiki taiki  256 Dec 15 2024 python.py
-rw-r--r--  1 taiki taiki  128 Dec 15 2024 react.jsx
-rw-r--r--  1 taiki taiki  192 Dec 15 2024 ai_models.py
-rw-r--r--  1 taiki taiki   64 Dec 15 2024 golf_stats.json
-rw-r--r--  1 taiki taiki   32 Dec 15 2024 ado_playlist.m3u`
    },
    {
      input: "cat ~/current_status.json",
      output: `{
  "role": "Software Engineer & IT Associate",
  "company": "Geolabs Inc",
  "location": "Honolulu, HI",
  "education": "UC Irvine CS '25",
  "current_projects": ["AI Search System", "Data Pipeline"],
  "passion_projects": ["Golf Analytics", "Music Recommendation AI"],
  "favorite_artist": "Ado",
  "sports": ["Golf", "Pickleball"],
  "status": "Building the future with AI"
}`
    },
    {
      input: "python -c \"import this\"",
      output: `The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
...
Special cases aren't special enough to break the rules.
Although practicality beats purity.`
    }
  ];

const Terminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const command = commands[currentCommand];
    let i = 0;
    const fullText = `$ ${command.input}\n${command.output}`;
    let typeInterval;
    let advanceTimer;
    const startTimer = setTimeout(() => {
      typeInterval = setInterval(() => {
        setDisplayText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(typeInterval);
          advanceTimer = setTimeout(() => {
            setCurrentCommand((prev) => (prev + 1) % commands.length);
            setDisplayText('');
          }, 3000);
        }
      }, 50);
    }, 2000);

    return () => {
      clearTimeout(startTimer);
      clearInterval(typeInterval);
      clearTimeout(advanceTimer);
    };
  }, [currentCommand]);

  return (
    <section id="terminal" className="terminal-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Live Terminal</h2>
          <p className="section-subtitle">Watch me work in real-time</p>
        </div>

        <div className="terminal-container cyber-card">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control close"></span>
              <span className="control minimize"></span>
              <span className="control maximize"></span>
            </div>
            <div className="terminal-title">
              <FaTerminal />
              <span>taiki@geolabs:~</span>
            </div>
            <div className="terminal-status">
              <FaPlay />
              <span>Running</span>
            </div>
          </div>
          <div className="terminal-body">
            <pre className="terminal-output">
              {displayText}
              <span className="terminal-cursor">█</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terminal;
