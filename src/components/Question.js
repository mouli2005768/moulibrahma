import React, { useState, useEffect } from "react";
import "./Question.css";
import somuImage from "./Mouli.jpg"; // Import the image from the components folder

const Question = () => {
  const messages = [
    "Aww, that's so sweet! I love you too! ❤",
    "You just made my day! Yes, I do love you! 💕",
    "Well, who wouldn't? You're amazing! 😘",
    "That's so sweet of you! Yes, I love you to the moon and back! 🌙💖",
    "Yay! I knew it! 💖 But I think it's time for a hug... 🤗",
    "Of course, how could I not? You're just too lovable! 😏💘",
    "You’ve got my heart now! Yes, I love you so much! 💓",
    "Forever and always, I love you! 🥰💖",
    "Yes, a thousand times yes! I’m totally head over heels for you! 💘😍",
    "My heart beats just for you... Yes, I love you with all my soul. 💞🌹",
    "Well, you’re officially my favorite person now! 😄❤",
    "Did I just win the jackpot? Yes, yes, yes! You’re the one! 💖🎉",
    "I didn’t know my heart could be this full... Yes, I love you! 💕",
    "Of course, I do! You’re the best thing that’s ever happened to me. ❤👑",
    "I love you more than pizza! 🍕💘",
  ];

  const [messageIndex, setMessageIndex] = useState(null); // Start with null to not show messages initially
  const [firstClick, setFirstClick] = useState(false); // Track if the first click has happened

  // Function to handle Yes click
  const handleClickYes = () => {
    if (!firstClick) {
      // When Yes is clicked for the first time, generate a random message
      const randomIndex = Math.floor(Math.random() * messages.length);
      setMessageIndex(randomIndex);
      setFirstClick(true); // Mark that first click has happened
      localStorage.setItem("messageIndex", randomIndex); // Store the message index in localStorage
    } else {
      // If Yes is clicked again, show next message
      setMessageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % messages.length;
        localStorage.setItem("messageIndex", newIndex); // Store the updated index in localStorage
        return newIndex;
      });
    }
  };

  // Function to move No button
  const moveNoButton = (e) => {
    const randomX = Math.floor(Math.random() * (window.innerWidth - 100)); // Subtract button width
    const randomY = Math.floor(Math.random() * (window.innerHeight - 25)); // Subtract button height
    e.target.style.position = "absolute";
    e.target.style.left = `${randomX}px`;
    e.target.style.top = `${randomY}px`;
  };

  // On page load, check localStorage for the message index after the first click
  useEffect(() => {
    const savedIndex = localStorage.getItem("messageIndex");
    if (savedIndex && firstClick) {
      setMessageIndex(Number(savedIndex)); // Restore the last message index
    }
  }, [firstClick]);

  return (
    <div className="question-container">
      <h1>Do you Love me?</h1>
      <img src={somuImage} alt="Somu" className="photo" />
      <div className="buttons">
        <button id="yes" onClick={handleClickYes}>
          Yes
        </button>
        <button id="no" onMouseOver={moveNoButton}>
          No
        </button>
      </div>
      {/* Show message only after Yes is clicked */}
      {messageIndex !== null && <p>{messages[messageIndex]}</p>}
    </div>
  );
};

export default Question;
