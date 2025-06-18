export interface ComicCharacter {
  name: string;
  universe: 'Marvel' | 'DC';
  image: string;
  email: string;
  role: 'superhero' | 'villain';
}

import batmanImg from '../assets/batman.jpeg';
import supermanImg from '../assets/superman.jpeg';
import ironmanImg from '../assets/ironman.png';
import thanosImg from '../assets/thanos.jpeg';
import spidermanImg from '../assets/spiderman.jpeg';
import jokerImg from '../assets/joker.jpeg';
import starlordImg from '../assets/starlord.jpg';
import rocketImg from '../assets/rocket.jpeg';
import venomImg from '../assets/venom.jpeg';
import hulkImg from '../assets/hulk.jpeg';

export const comicCharacters: ComicCharacter[] = [
  {
    name: 'Batman',
    universe: 'DC',
    image: batmanImg,
    email: 'batman@dc.com',
    role: 'superhero'
  },
  {
    name: 'Superman',
    universe: 'DC',
    image: supermanImg,
    email: 'superman@dc.com',
    role: 'superhero'
  },
  {
    name: 'Iron Man',
    universe: 'Marvel',
    image: ironmanImg,
    email: 'ironman@marvel.com',
    role: 'superhero'
  },
  {
    name: 'Thanos',
    universe: 'Marvel',
    image: thanosImg,
    email: 'thanos@marvel.com',
    role: 'villain'
  },
  {
    name: 'Spider-Man',
    universe: 'Marvel',
    image: spidermanImg,
    email: 'spiderman@marvel.com',
    role: 'superhero'
  },
  {
    name: 'Joker',
    universe: 'DC',
    image: jokerImg,
    email: 'joker@dc.com',
    role: 'villain'
  },
  {
    name: 'Starlord',
    universe: 'Marvel',
    image: starlordImg,
    email: 'starlord@marvel.com',
    role: 'superhero'
  },
  {
    name: 'Rocket Raccoon',
    universe: 'Marvel',
    image: rocketImg,
    email: 'rocketraccoon@marvel.com',
    role: 'superhero'
  },
  {
    name: 'Venom',
    universe: 'Marvel',
    image: venomImg,
    email: 'venom@marvel.com',
    role: 'villain'
  },
  {
    name: 'Hulk',
    universe: 'Marvel',
    image: hulkImg,
    email: 'hulk@marvel.com',
    role: 'superhero'
  },
];

export function getRandomComicCharacter(): ComicCharacter {
  return comicCharacters[Math.floor(Math.random() * comicCharacters.length)];
}
