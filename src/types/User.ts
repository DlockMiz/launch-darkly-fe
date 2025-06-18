export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: string;
  type: UserType;
  universe?: string;
}

export const UserType = {
  ComicCharacter: 'comic_character',
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

