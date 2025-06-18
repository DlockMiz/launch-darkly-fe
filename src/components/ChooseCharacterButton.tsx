import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';
import { UserType, type User } from '../types/User';
import { getRandomComicCharacter } from '../types/ComicCharacter';

const ChooseCharacterButton: React.FC<{ onCharacterAssign: (user: User) => void }> = ({ onCharacterAssign }) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const character = getRandomComicCharacter();
        const user: User = {
          id: Math.random().toString(36).substring(2, 10),
          name: character.name,
          email: character.email,
          avatarUrl: character.image,
          role: character.role,
          universe: character.universe,
          type: UserType.ComicCharacter,
        };
        onCharacterAssign(user);
      }}
    >
      Choose Character
    </Button>
  </Box>
);

export default ChooseCharacterButton;
