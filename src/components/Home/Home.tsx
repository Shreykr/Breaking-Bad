import React, {useState, useEffect, useRef} from 'react';
import './home.css';
import axios from 'axios';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import CharacterCard from './CharacterCard/CharacterCard';
import Spinner from '../../core/Spinner/Spinner'

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
  const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
  let navigate: NavigateFunction = useNavigate();
  let firstLoad:React.MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    (async () => {
      let result = await axios.get('https://www.breakingbadapi.com/api/characters');
      setTimeout(() => {
        setCharacterData(result.data);
      }, 600);
      setTimeout(async () => {
        await setLoadingStatus(false);
        firstLoad.current = true;
      }, 700);
    })();
  }, []);

  const navigateFunction = (name: string, character:Character) => {
    name = name.replace(' ', '+');
    name = '/character/' + name;
    navigate(name,{ state: character });
  }

  return (
    <>
      <div className={'container' + (!firstLoad.current && loadingStatus && characterData?.length !== 0 ? ' initial__state':'')  }>
        {!firstLoad.current && loadingStatus ?
          <div className='character-spinner'>
            <Spinner />
          </div>: (characterData?.length !== 0 || characterData !== undefined) ? characterData?.map((character: Character) => (
            <CharacterCard key={character.char_id} character={character} handleClick={navigateFunction} />
          )) :
          <div className='character-not-found'>
            <strong>No Characters Found</strong> 😥
          </div>
        }
      </div>
    </>
  )
}

export default Home