import * as React from 'react';
import SingleCard from './components/SingleCard';
import './style.css';

export default function App() {

  const cardImages = [
    {"src":"https://images.pexels.com/photos/3658120/pexels-photo-3658120.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false},
    {"src":"https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false},
    {"src":"https://images.pexels.com/photos/4588052/pexels-photo-4588052.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false},
    {"src":"https://images.pexels.com/photos/3671300/pexels-photo-3671300.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false},
    {"src":"https://images.pexels.com/photos/3196887/pexels-photo-3196887.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false},
    {"src":"https://images.pexels.com/photos/5122188/pexels-photo-5122188.jpeg?auto=compress&cs=tinysrgb&w=400",matched:false}
  ]

  const [cards,setCards] = React.useState([])
  const [turns,setTurns] = React.useState(0)

  const [choiceOne, setChoiceOne] = React.useState(null)
  const [choiceTwo, setChoiceTwo] = React.useState(null)
  
  const [disabled,setDisabled] = React.useState(false)

    //shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages,...cardImages]
          .sort(()=> Math.random() - 0.5)
          .map((card)=> ({...card,id: Math.random() }))
          
        setChoiceOne(null)
        setChoiceTwo(null)  
        setCards(shuffledCards)
        setTurns(0)
        }

    // handle a choice

    const handleChoice = (card:string) =>  {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }


    //compare two selected cards 
    React.useEffect(()=>{
      if (choiceOne && choiceTwo) {
      setDisabled(true)
        if (choiceOne && choiceTwo) {
          if (choiceOne.src === choiceTwo.src) {
            setCards(prevCards=> {
                      return prevCards.map(card=>{
                         if (card.src===choiceOne.src){
                           return {...card, matched:true}
                         } else {
                           return card
                         }
                      })
                    })
            resetTurn()
          }else {
            setTimeout(()=>resetTurn(),1000)
            
          }
        }
      }
    },[choiceOne,choiceTwo])

    console.log(cards)

    // reset choices & increase turn
    const resetTurn = () => {
      setChoiceOne(null)
      setChoiceTwo(null)
      setTurns(prevTurn => prevTurn + 1)
      setDisabled(false)
    }

    React.useEffect(()=>{
      shuffleCards()
    },[])

  return (

  <div className='App'>
      <h1>MEMORY GAME</h1>
      <button onClick={shuffleCards}>New Game</button>

    <div className="card-grid">
      {cards.map(card=> (
          <SingleCard key={card.id} 
                      card={card}
                      handleChoice={handleChoice}
                      flipped={card === choiceOne || card === choiceTwo || card.matched}
                     disabled={disabled}
                      />
      ))}

    </div>
    <p>Turns: {turns}</p>

  </div>
  
  );
}
