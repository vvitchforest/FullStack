import React, { useState } from "react";

const Header = ({title}) => {
  return <h1>{title}</h1>;
};

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td style={{ border: '1px solid lightgrey' }}> {text}</td>
      <td style={{ border: '1px solid lightgrey' }}>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const allClicks = good + neutral + bad;
  const average = Math.round((good - bad) / allClicks * 100)/100;
  const positive = Math.round((good / allClicks) * 100 * 100)/100 + " %";

  return (
    <>
      {allClicks === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={allClicks} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={handleGoodClick} text="good"></Button>
      <Button handleClick={handleNeutralClick} text="neutral"></Button>
      <Button handleClick={handleBadClick} text="bad"></Button>
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
