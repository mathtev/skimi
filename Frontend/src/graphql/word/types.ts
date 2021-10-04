export interface Word {
  id: number;
  name: string;
  languageId: number;
  levelId: number;
}

export interface Words {
  words: Word[];
}
