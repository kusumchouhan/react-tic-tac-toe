import { useState } from 'react'
export default function Player({name,symbol,isActive,onNameChange})
{
    const [isEditing,setIsEditing] =  useState(false);
    const [playerName,setPlayerName] = useState(name);

    let editablePlayerName = <span className="player-name">{playerName}</span>

    function handleEditClick()
    {
        setIsEditing((editing) => !editing);

        if(isEditing)
        {
            onNameChange(symbol,playerName);
        }
    }

    function handleInput(event)
    {
        setPlayerName(event.target.value);
    }

    if(isEditing)
    {
        editablePlayerName = <input type='text' value={playerName} required  onChange={handleInput}/>
    }


    return (
        <li className={isActive === true ? 'active' : undefined}>
            <span className='player'>
                { editablePlayerName }
              <span className="player-symbol">
                {symbol}
              </span>
            </span>
           <button onClick={handleEditClick}> {isEditing ? 'Save' : 'Edit'} </button> 
        </li>
    );
}