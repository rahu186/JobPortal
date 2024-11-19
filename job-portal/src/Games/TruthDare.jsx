import React, { useState } from 'react';

const TruthDare = () => {
  const truths = [
    "What is your biggest secret?",
    "Have you ever had a crush on a teacher?",
    "What is the most embarrassing thing you've ever done?",
    "What is your biggest fear?",
    "If you could be any animal, what would you be and why?",
    "Who was your first crush?",
    "Have you ever lied to your best friend?",
    "What's the most trouble you've ever been in?",
    "What's a habit you have that you wish you could break?",
    "What's the most childish thing you still do?",
    "If you could change one thing about yourself, what would it be?",
    "Have you ever cheated on a test?",
    "Who do you secretly envy and why?",
    "What was your most embarrassing moment in school?",
    "Have you ever pretended to be sick to get out of something?",
    "If you could live anywhere, where would it be?",
    "What's your biggest pet peeve?",
    "What's a talent you wish you had?",
    "Have you ever had a crush on someone who didn't like you back?",
    "What's the weirdest dream you've ever had?",
    "Have you ever broken the law?",
    "What's the most annoying thing about the person sitting next to you?",
    "What's your guilty pleasure?",
    "Who is the person you dislike the most, and why?",
    "What's the craziest thing you've ever done?",
    "What's the one thing you would never do, no matter the amount of money?",
    "If you could swap lives with anyone for a day, who would it be?",
    "Have you ever been caught doing something you shouldn't have?",
    "What's the meanest thing you've ever said to someone?",
    "If you could be invisible for a day, what would you do?",
    "Have you ever snooped through someone's phone?",
    "What's the worst gift you've ever received?",
    "If you could go back in time and change one thing, what would it be?",
    "Have you ever been rejected?",
    "Who was your first kiss?",
    "What's something you've never told anyone?",
    "What's your biggest insecurity?",
    "Have you ever stolen something?",
    "What's the worst thing you've done while drunk?",
    "If you could know one thing about your future, what would it be?",
    "Who would you like to be stuck on a deserted island with?",
    "What's the worst thing you've done out of anger?",
    "If you could change your name, what would it be?",
    "Have you ever lied to get out of trouble?",
    "What's the most awkward date you've ever been on?",
    "What's the longest you've gone without showering?",
    "Have you ever been jealous of a friend's success?",
    "What's your most embarrassing social media post?",
    "What's the craziest rumor you've heard about yourself?",
    "What's the most awkward thing that's happened to you in public?"
  ];

  const dares = [
    "Do 20 pushups.",
    "Sing a song chosen by the group.",
    "Dance without music for one minute.",
    "Let someone give you a makeover.",
    "Imitate a celebrity until someone can guess who you are.",
    "Talk in an accent for the next three rounds.",
    "Eat a raw onion slice.",
    "Let someone write a word on your forehead in a marker.",
    "Wear socks on your hands until your next turn.",
    "Speak only in questions for the next three rounds.",
    "Let the person next to you redo your hairstyle.",
    "Try to lick your elbow.",
    "Do your best impression of a baby crying.",
    "Talk without closing your mouth.",
    "Let someone tickle you for 30 seconds.",
    "Run outside and yell, 'I love [someone in the group]!'",
    "Post an embarrassing photo of yourself online.",
    "Let someone draw on your face with a pen.",
    "Speak in a made-up language for the next three rounds.",
    "Eat a spoonful of mustard.",
    "Let someone read the last text message you received.",
    "Attempt to juggle three items chosen by the group.",
    "Wear a funny hat until your next turn.",
    "Pretend to be a waiter and take snack orders from the group.",
    "Let someone style your hair in a silly way.",
    "Try to do a magic trick.",
    "Do a cartwheel.",
    "Pretend you're a dog and act like one for the next three rounds.",
    "Let the group go through your phone for one minute.",
    "Sing everything you say for the next three rounds.",
    "Speak in a robot voice until your next turn.",
    "Balance a book on your head for the next three rounds.",
    "Do your best evil laugh.",
    "Walk on your knees until your next turn.",
    "Let someone tickle you and try not to laugh.",
    "Do your best model runway walk.",
    "Pretend to be a superhero and make up your own powers.",
    "Let the group choose an emoji for you to send to your crush.",
    "Try to put your leg behind your head.",
    "Do an impression of your favorite movie character.",
    "Wear your clothes backward for the next three rounds.",
    "Try to do a headstand.",
    "Speak in rhyme for the next three rounds.",
    "Do an impression of an animal of the group’s choice.",
    "Wear a blindfold and let someone feed you a mystery snack.",
    "Talk like a pirate for the next three rounds.",
    "Sing the chorus of a song like you're in an opera.",
    "Let someone draw a temporary tattoo on your arm.",
    "Do 10 jumping jacks."
  ];

  const [result, setResult] = useState('');
  const [isDare, setIsDare] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomTruth = () => {
    const randomTruth = truths[Math.floor(Math.random() * truths.length)];
    setResult(randomTruth);
    setIsDare(false);
  };

  const getRandomDare = () => {
    const randomDare = dares[Math.floor(Math.random() * dares.length)];
    setResult(randomDare);
    setIsDare(true);
  };

  const resetGame = () => {
    setResult('');
    setIsDare(false);
  };

  const spinBottle = () => {
    const randomSpinDegree = Math.floor(Math.random() * 720) + 360;
    setSpinDegree((prevDegree) => prevDegree + randomSpinDegree);
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="bg-[#272525] w-full min-h-screen flex justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md grid sm:grid-rows-2 gap-6 p-6 sm:p-10">
        
        {/* First Row: Bottle Spinner Section */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative flex flex-col items-center">
            {/* Circular "Table" Below the Bottle */}
            <div
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gray-200 flex items-center justify-center mb-4 shadow-lg"
              style={{ backgroundImage: 'url("/images/table.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div
                className={`bottle`}
                style={{
                  transform: `rotate(${spinDegree}deg)`,
                  transition: isSpinning ? 'transform 0.5s ease' : 'transform 1s ease',
                  width: '100px', // Adjust size for better responsiveness
                  height: '120px',
                }}
              >
                <img src="/images/bottle.png" alt="Spinning Bottle" style={{ width: '100%', height: '100%' }} />
              </div>
            </div>
            <button
              onClick={spinBottle}
              className="bg-blue text-white rounded p-2 sm:p-4 text-lg sm:text-xl"
            >
              Spin the Bottle
            </button>
          </div>
        </div>

        {/* Second Row: Truth or Dare Section */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Truth or Dare</h1>
          <div className="flex flex-col mb-4">
            <button
              onClick={getRandomTruth}
              className="bg-blue text-white rounded p-3 sm:p-4 mb-2 text-lg sm:text-xl"
            >
              Get a Truth
            </button>
            <button
              onClick={getRandomDare}
              className="bg-blue text-white rounded p-3 sm:p-4 text-lg sm:text-xl"
            >
              Get a Dare
            </button>
          </div>
          <button
            onClick={resetGame}
            className="bg-gray-300 text-black rounded p-3 sm:p-4 w-full text-lg sm:text-xl"
          >
            Reset
          </button>
          {result && (
            <div className="mt-4 text-center text-lg sm:text-xl">
              <h2 className="font-bold">{isDare ? 'Your Dare:' : 'Your Truth:'}</h2>
              <p>{result}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TruthDare;
