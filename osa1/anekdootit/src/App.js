import React, { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>{votes}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(7));
  const [mostVoted, setMostVoted] = useState(0);
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    getBestAnecdote(copy);
  };

  const getBestAnecdote = (votes) => {
    const maxVotes = Math.max(...votes);
    setMostVoted(maxVotes);
    const index = votes.indexOf(maxVotes);
    setMostVotedIndex(index);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVoteAnecdote} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {votes.every((item) => item === 0) ? (
        <p>No votes</p>
      ) : (
        <Anecdote anecdote={anecdotes[mostVotedIndex]} votes={mostVoted} />
      )}
    </div>
  );
};

export default App;
