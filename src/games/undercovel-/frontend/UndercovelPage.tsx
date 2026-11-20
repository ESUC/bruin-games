"use client"; // this page runs in the browser, so it can react to typing

import { useState, type FormEvent } from "react";

const UCLA_BLUE = "#2774AE";
const PROMPT = "Name something you'd find on Bruin Walk.";

export default function UndercovelPage() {
  // useState = a value React remembers. When it changes, React redraws the page.
  const [answers, setAnswers] = useState<string[]>([]); // every answer so far
  const [input, setInput] = useState("");               // what's typed in the box

  // Runs when the player presses Enter inside the form.
  function handleSubmit(event: FormEvent) {
    event.preventDefault();             // stop the browser from reloading the page
    const answer = input.trim();        // remove extra spaces at the start/end
    if (answer === "") return;          // ignore empty answers
    setAnswers([...answers, answer]);   // a new list: the old answers + this one
    setInput("");                       // empty the box for the next answer
  }

  return (
    // position: fixed + inset: 0 makes the blue fill the whole browser window
    <main style={{ position: "fixed", inset: 0, overflow: "auto", padding: 32, background: UCLA_BLUE, color: "white" }}>
      <h1>Undercovel</h1>
      <p>{PROMPT}</p>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type an answer, press Enter"
        />
      </form>

      {/* .map turns every answer into its own line on the page */}
      {answers.map((answer, i) => (
        <p key={i}>{answer}</p>
      ))}
    </main>
  );
}
