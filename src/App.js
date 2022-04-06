import React, { useEffect, useState } from "react";
import './App.css';
import CardComponent from "./components/card";

  // new test
const cardImages = [
  {'src': '/img/angular.png', matched: false},
  {'src': '/img/vue.png', matched: false},
  {'src': '/img/javaScript.png', matched: false},
  {'src': '/img/node.png', matched: false},
  {'src': '/img/php.png', matched: false},
  {'src': '/img/react.png', matched: false},
];

export default function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [ChoiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

// next 

const shuffleCards = () => {
  const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }))
  
  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards)
  setTurns(0)
}
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && ChoiceTwo) {
      setDisabled(true)
      if(choiceOne.src === ChoiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, ChoiceTwo])
  
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  useEffect(() => {
    shuffleCards()
  }, []) 

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>
          Restart
      </button>
      <div className="card-grid">
        {cards.map( card => (
          <CardComponent 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === ChoiceTwo || card.matched}
            disabled={disabled}
          />   
        ))}
      </div>
      <p> Turns: {turns}</p>
    </div>
  );
}