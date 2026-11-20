"use client"; // this page runs in the browser, so it can react to typing

import { useState, type FormEvent } from "react";

const START = "COLD";
const GOAL = "WARM";

export default function WeaverPage() {
  // useState = a value React remembers. When it changes, React redraws the page.
  const [ladder, setLadder] = useState<string[]>([START]); // starts with one word
  const [input, setInput] = useState("");                  // what's typed in the box

  // Runs when the player presses Enter inside the form.
  function handleSubmit(event: FormEvent) {
    event.preventDefault();            // stop the browser from reloading the page
    const word = input.toUpperCase();
    if (word.length !== 4) return;     // only accept 4-letter words
    setLadder([...ladder, word]);      // a new list: the old ladder + this word
    setInput("");                      // empty the box for the next word
  }

  const won = ladder[ladder.length - 1] === GOAL;

  return (
    <main>
      <h1>UCLA Weaver</h1>

      {/* .map turns every word into its own line on the page */}
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
