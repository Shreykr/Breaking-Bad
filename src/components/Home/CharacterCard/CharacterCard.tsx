import React from 'react'
import { Character } from '../Home'
import './character-card.css';

interface CharacterCardProps {

    character:Character,
    handleClick: (name: string,character:Character) => void
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, handleClick }) => {
    return (
        <>
            <div className='card' onClick={()=>{handleClick(character.name, character)}}>
                <div className='image-container'>
                    <img src={character.img} className='card-image' alt={character.name} height="262.69" width="216" decoding="async"/>
                </div>
                <div className='card-name'>
                    <h3>{character.name}</h3>
                </div>
            </div>
      </>

  )
}

export default CharacterCard