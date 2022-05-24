import React, {useState, useEffect} from 'react';
import './home.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import CharacterCard from './CharacterCard/CharacterCard';
export interface Character {
  appearance: number[];
  better_call_saul_appearance: number,
  birthday: string,
  category: string,
  char_id: number,
  img: string,
  name: string,
  occupation: string[],
  portrayed: string,
  status: string,
  nickname: string
}

const Home: React.FC = () => {

  let [characterData, setCharacterData] = useState<Character[]>();
  let navigate = useNavigate();

  useEffect(() => {
    (async () => {
    let result = await axios.get('https://www.breakingbadapi.com/api/characters');
    setCharacterData(result.data);
    })();
  }, []);

  const handleClick = (name: string) => {
    name = name.replace(' ','+')
    navigate('/character/' + name);
  }

  return (
    <>
      <div className='container'>
        {
          characterData && characterData.map((character:Character) => (
            <CharacterCard key={character.char_id} character={character} handleClick={handleClick} />
          ))
        }
      </div>
    </>
  )
}

export default Home