import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import characterStyles from './character.module.css';
import useSound from 'use-sound';
import walter from "../../assets/Audio/GG.mp3";
import jesse from "../../assets/Audio/Science.mp3"
import saul from "../../assets/Audio/saul.mp3"
import gus from "../../assets/Audio/gusFring.mp3"
import hank from "../../assets/Audio/hank2.mp3"
import mike from "../../assets/Audio/mike3.mp3"

interface BbCharacter {
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
  nickname: string,
  length:number
}

const Character:React.FC = () => {
  let { character } = useParams<string>();
  const [bbCharacter, bbSetCharacter] = useState<BbCharacter>();
  let songImport;
  switch (character) {
    case 'Jesse+Pinkman': {
      songImport = jesse;
      break;
    }
    case 'Walter+White': {
      songImport = walter;
      break;
    }
    case 'Saul+Goodman': {
      songImport = saul;
      break;
    }
    case 'Gustavo+Fring': {
      songImport = gus;
      break;
    }
    case 'Henry+Schrader': {
      songImport = hank;
      break;
    }
    case 'Mike+Ehrmantraut': {
      songImport = mike;
      break;
    }
  }
  const [play] = useSound(songImport,{interrupt: true,volume:0.4});

  useEffect(() => {
    (async () => {
      let result = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${character}`);
      await bbSetCharacter(result.data[0]);
    })();
  },[])

  return (
    <>
      <div className={characterStyles.container}>
        {
          bbCharacter &&
          <div className={characterStyles.character__card} >
              <div className={characterStyles.card__image_container} >
              <img src={bbCharacter.img} className={characterStyles.card__image} alt={bbCharacter.name} height={262.69} width={216} onClick={()=>play()} />
            </div>
            <div className={characterStyles.character_card__details}>
              <div className={characterStyles.card__name}>
                <h1>{bbCharacter.name}</h1>
              </div>
              <div className={characterStyles.card__info}>
                <div className={characterStyles.card__row}>
                  <span>Nickname </span>
                  <span>{bbCharacter.nickname}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Status </span>
                  <span>{bbCharacter.status}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Occupation</span>
                  <span>{bbCharacter.occupation.join(', ')}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Portrayed </span>
                  <span>{bbCharacter.portrayed}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Category </span>
                  <span>{bbCharacter.category}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Birthday </span>
                  <span>{bbCharacter.birthday}</span>
                </div>
                <div className={characterStyles.card__row}>
                  <span>Season </span>
                  <span>{bbCharacter.appearance.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Character