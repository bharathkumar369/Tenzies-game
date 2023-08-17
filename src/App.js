import './App.css';
import React from "react"
import DieComponent from './DieComponents/DIeComponents';
import {nanoid} from "nanoid"

function App() {

  const generateNewDie = () => {
   return {value : Math.ceil(Math.random() * 6), 
      isHeld : false , 
      id: nanoid()
    };
  }

  const NewDice = () => {
    const Dice= [];
    for(let i = 0; i < 10; i++){
      Dice.push(generateNewDie())    
    }
    return Dice;
  }

  const [dice,setDice] = React.useState(NewDice());

  const [tenzies,setTenzies] = React.useState (false)

  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue);
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!")
    }
  },[dice])

  const rollDice = () => {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }));
    }else {
      setTenzies(false)
      setDice(NewDice())
    }
  }

  const holdDice = (id) => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die,isHeld : ! die.isHeld} :
      die
    }))
  }

  const diceElements = dice.map(die =>
    <DieComponent 
      isHeld={die.isHeld} 
      key={die.id} 
      value={die.value}
      holdDice = {()=> holdDice(die.id)}
    />)

  return (
    <main>
      <h1 className='title'> TENZIES </h1>
      <p className='description'>Roll until dice are the same.click each die to 
        freeze it as its current value between rolls.
      </p>
      <div className="die-grid">
        {diceElements}      
      </div>  
      <button 
        className='roll-dice' 
        onClick={rollDice}
      >
        {tenzies ? "New Roll" : " Roll"}
      </button>    
    </main>
  )
}

export default App;

// const NewDice = () => {
//   const Dice= [];
//   for(let i = 0; i < 10; i++){
//     Dice.push(Math.ceil(Math.random() * 6));
//   }
//   return Dice;
// }
// console.log(NewDice())

// return (
//   <main>
//     <div className="die-grid">
//       <DieComponent value="1"/>
//       <DieComponent value="2"/>
//       <DieComponent value="3"/>
//       <DieComponent value="4"/>
//       <DieComponent value="5"/>
//       <DieComponent value="6"/>
//       <DieComponent value="7"/>
//       <DieComponent value="8"/>
//       <DieComponent value="9"/>
//       <DieComponent value="0"/>

//     </div>
//   </main>