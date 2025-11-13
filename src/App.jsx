import React, { useState, useEffect, useRef } from "react";
import './App.css';
import Emma from './girlscenarios/Emma';
import Lisa from './girlscenarios/Lisa';
import Mia from './girlscenarios/Mia';
import Zoe from './girlscenarios/Zoe';

export default function App() {
  const [screen, setScreen] = useState("menu");
  const [nodeId, setNodeId] = useState("start");
  const [stats, setStats] = useState({ affection: { Emma:0, Lisa:0, Mia:0, Zoe:0 } });
  const [dialogIndex, setDialogIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [paused, setPaused] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const [dialogSpeed, setDialogSpeed] = useState(1500); 
  const [darkMode, setDarkMode] = useState(false);

  const autoAdvanceRef = useRef(null);

  const girlsNodes = { ...Emma(), ...Lisa(), ...Mia(), ...Zoe() };

  const campusNode = {
    title: "Back to Campus",
    text: ["You return to campus, ready for another day of interactions."],
    img: null,
    bg: "assets/campus_bg.jpg",
    choices: [
      { text: "Choose a girl", next: "start" }
    ]
  };

  const startNode = {
    title: "Start Your Story",
    text: ["Choose a girl to spend time with first:"],
    img: null,
    bg: "assets/campus_bg.jpg",
    choices: [
      { text: "Emma", next: "emma_intro" },
      { text: "Lisa", next: "lisa_intro" },
      { text: "Mia", next: "mia_intro" },
      { text: "Zoe", next: "zoe_intro" }
    ]
  };

  const secretMultiGirlNode = {
    secret_multi_girl: {
      title: "Special Event with Multiple Girls",
      text: [
        "Wow! You've grown close to more than one girl!",
        "They all gather for a fun day in the park, laughing together.",
        "You feel a warm sense of friendship and romance mixing together.",
        "This special moment will be remembered forever."
      ],
      img: null,
      bg: "assets/park_bg.jpg",
      choices: [{ text: "Return to Campus", next: "campus_choice" }]
    },
    neutral_end: {
      title: "End of Day",
      text: [
        "You go home reflecting on your day.",
        "You didn’t get particularly close with anyone today."
      ],
      img: null,
      bg: "assets/campus_bg.jpg",
      choices: [{ text: "Return to Campus", next: "campus_choice" }]
    }
  };

  const nodes = { 
    start: startNode,
    campus_choice: campusNode,
    ...girlsNodes,
    ...secretMultiGirlNode
  };

  const currentNode = nodes[nodeId];

  if (!currentNode) {
    return (
      <div className="app-container">
        <h2>Error: Node not found</h2>
        <button onClick={() => setNodeId("start")}>Return to Menu</button>
      </div>
    );
  }

  const currentLine = typeof currentNode.text === "function" ? currentNode.text(stats)[dialogIndex] : currentNode.text[dialogIndex];

  useEffect(() => {
    if (paused) return;

    if (dialogIndex + 1 < (typeof currentNode.text === "function" ? currentNode.text(stats).length : currentNode.text.length)) {
      autoAdvanceRef.current = setTimeout(() => {
        setDialogIndex(prev => prev + 1);
      }, dialogSpeed);
    }

    return () => clearTimeout(autoAdvanceRef.current);
  }, [dialogIndex, paused, currentNode, stats, dialogSpeed]);

  function startGame() {
    setStats({ affection: { Emma:0, Lisa:0, Mia:0, Zoe:0 } });
    setNodeId("start");
    setLog([]);
    setScreen("playing");
    setDialogIndex(0);
    setPaused(false);
    setShowLog(false);
  }

  function choose(choice) {
    if (!choice) return;

    if (choice.effects?.affection) {
      const newAff = { ...stats.affection };
      Object.keys(choice.effects.affection).forEach(g => newAff[g] += choice.effects.affection[g]);
      setStats({ affection: newAff });
    }

    const nodeText = typeof currentNode.text === "function" ? currentNode.text(stats) : currentNode.text;
    setLog(prev => [...prev, { title: currentNode.title, text: nodeText, img: currentNode.img, bg: currentNode.bg }]);

    if (choice.next.endsWith("_end")) {
      const endingNode = checkSecretEnding(stats);
      setNodeId(endingNode);
      setDialogIndex(0);
    } else {
      setNodeId(choice.next);
      setDialogIndex(0);
    }
  }

  function checkSecretEnding(stats) {
    const highAffectionGirls = Object.entries(stats.affection)
      .filter(([_, v]) => v >= 4)
      .map(([g, _]) => g);

    if (highAffectionGirls.length >= 2) return "secret_multi_girl";
    if (highAffectionGirls.length === 1) return `${highAffectionGirls[0].toLowerCase()}_end`;
    return "neutral_end";
  }

  function exitGame() {
    setScreen("menu");
    setPaused(false);
    setDialogIndex(0);
    setShowLog(false);
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`} 
         style={{ backgroundImage: currentNode.bg ? `url(${currentNode.bg})` : 'none' }}>
      {screen === "menu" && (
        <div className="menu-container">
          <h1>Romance Story Game</h1>
          <button onClick={startGame}>Start</button>
          <button onClick={()=>setShowSettings(true)}>Settings</button>
        </div>
      )}

      {screen === "playing" && (
        <div className="game-container">
          <div className="top-buttons">
            <button onClick={()=>setPaused(!paused)}>{paused ? "Resume" : "Pause"}</button>
            <button onClick={()=>setShowLog(!showLog)}>{showLog ? "Hide Log" : "Show Log"}</button>
            <button onClick={exitGame}>Exit</button>
          </div>

          <div className="main-content">
            <div className="character-container">
              {currentNode.img && <img className="character-img" src={currentNode.img} alt={currentNode.title} />}
              <div className="story-node">
                <h2>{currentNode.title}</h2>
                <p>{currentLine}</p>

                {dialogIndex + 1 < (typeof currentNode.text === "function" ? currentNode.text(stats).length : currentNode.text.length)
                  ? null
                  : currentNode.choices?.map((c,i) => <button key={i} onClick={()=>choose(c)}>{c.text}</button>)
                }
              </div>
            </div>
          </div>

          <div className="affection-hud">
            {Object.entries(stats.affection).map(([g,v]) => <span key={g}>{g}: {v}</span>)}
          </div>

          {showLog && (
            <div className="log">
              <h3>Dialogue Log</h3>
              {log.map((entry,i) => (
                <div key={i} className="log-entry">
                  <strong>{entry.title}</strong>
                  {entry.img && <img className="log-img" src={entry.img} alt={entry.title} />}
                  {entry.text.map((line,j)=><p key={j}>{line}</p>)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showSettings && (
        <div className="settings-modal">
          <h3>Settings</h3>

          <label>
            Dialogue Speed: {dialogSpeed}ms
            <input 
              type="range" 
              min={500} 
              max={5000} 
              step={100} 
              value={dialogSpeed}
              onChange={(e) => setDialogSpeed(Number(e.target.value))}
            />
          </label>

          <label style={{ display: 'block', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={(e) => setDarkMode(e.target.checked)}
            /> Enable Dark Mode
          </label>

          <button onClick={()=>setShowSettings(false)}>Close</button>
        </div>
      )}
    </div>
  );
}