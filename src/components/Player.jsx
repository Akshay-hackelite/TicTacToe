import { useState } from "react"

export default function Player({initialname,symbol,isActive,names}){
    const[playerName,setPlayerName]=useState(initialname);
    const [isEditing,setIsEditing]=useState(false);
    function handleEditClick(){
        setIsEditing(isEditing=>!isEditing) 
 
    }
    function handleChange(e){
        setPlayerName(e.target.value)
        if(symbol=='X'){
            names.X=e.target.value
        }
        else{
             names.O=e.target.value
        }
    }
    let editablePlayerName=<span className="player-name">{playerName}</span>
  
    if(isEditing){
        editablePlayerName=<input type="text" value={playerName} onChange={handleChange}/>

    }
    return(
        <>
        <li className={isActive?'active':undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
        </>
    )
}