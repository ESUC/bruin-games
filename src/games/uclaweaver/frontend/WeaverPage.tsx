"use client"; // this page runs in the browser, so it can react to typing

import { useState, type FormEvent } from "react";

const START = "COLD";
const GOAL = "WARM";

export default function WeaverPage() {
  const [ladder, setLadder] = useState<string[]>([START]); 
  const [input, setInput] = useState("");                 
  function handleSubmit(event: FormEvent) {
    event.preventDefault();            
    const word = input.toUpperCase();
    if (word.length !== 4) return;    
    setLadder([...ladder, word]);    
    setInput("");                  
  }

  const won = ladder[ladder.length - 1] === GOAL;

  return (
    <main>
      <h1>UCLA Weaver</h1>
      {ladder.map((word, i) => (
        <p key={i}>{word}</p>
      ))}

      {won ? (
        <p>You reached {GOAL} in {ladder.length - 1} steps!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={4}
            placeholder="Next word, press Enter"
          />
        </form>
      )}

      <p>Goal: {GOAL}</p>
    </main>
  );
}
