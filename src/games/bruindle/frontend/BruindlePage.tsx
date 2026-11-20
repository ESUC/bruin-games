"use client"; 

import { useState, type FormEvent } from "react";

const MAX_GUESSES = 6;

export default function BruindlePage() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();            
    const guess = input.toUpperCase();
    if (guess.length !== 5) return;     
    setGuesses([...guesses, guess]);   
    setInput("");
  }

  const outOfGuesses = guesses.length >= MAX_GUESSES;

  return (
    <main>
      <h1>Bruindle</h1>
      {guesses.map((guess, i) => (
        <p key={i}>{guess}</p>
      ))}
      {!outOfGuesses && (
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={5}
            placeholder="Type a guess, press Enter"
          />
        </form>
      )}
      <p>{guesses.length} / {MAX_GUESSES} guesses</p>
    </main>
  );
}
