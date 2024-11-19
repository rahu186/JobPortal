import React, { useState } from 'react';

const Flames = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const calculateFLAMES = () => {
    // Remove spaces and convert to lowercase
    const cleanName1 = name1.replace(/\s+/g, '').toLowerCase();
    const cleanName2 = name2.replace(/\s+/g, '').toLowerCase();

    // Count unique letters
    const uniqueLetters = (str1, str2) => {
      const combined = (str1 + str2).split('');
      const counts = {};

      combined.forEach(char => {
        counts[char] = (counts[char] || 0) + 1;
      });

      return Object.values(counts).filter(count => count === 1).length;
    };

    const uniqueCount = uniqueLetters(cleanName1, cleanName2);
    const flamesList = ['F', 'L', 'A', 'M', 'E', 'S'];
    let index = 0;

    // Calculate the outcome using the FLAMES logic
    while (flamesList.length > 1) {
      index = (index + uniqueCount - 1) % flamesList.length; // Move index
      flamesList.splice(index, 1); // Remove element
    }

    // Determine the result based on the remaining letter
    let outcome = flamesList[0];
    let outcomeMessage;

    switch (outcome) {
      case 'F':
        outcomeMessage = "Friends";
        break;
      case 'L':
        outcomeMessage = "Love";
        break;
      case 'A':
        outcomeMessage = "Affection";
        break;
      case 'M':
        outcomeMessage = "Marriage";
        break;
      case 'E':
        outcomeMessage = "Enemies";
        break;
      case 'S':
        outcomeMessage = "Siblings";
        break;
      default:
        outcomeMessage = "Unknown";
    }

    setResult(outcomeMessage);
  };

  const resetFields = () => {
    setName1('');
    setName2('');
    setResult('');
  };

  return (
    <div className="bg-[#272525] flex justify-center items-start min-h-screen px-4 py-12">
      <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">FLAMES Game</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Enter your friend's name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-4 w-full"
        />
        <button
          onClick={calculateFLAMES}
          className="bg-blue text-white rounded p-2 w-full mb-2"
        >
          Calculate
        </button>
        <button
          onClick={resetFields}
          className="bg-gray-300 text-black rounded p-2 w-full"
        >
          Reset
        </button>
        {result && (
          <div className="mt-4 text-lg">
            <h2 className="font-bold">Result:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flames;
