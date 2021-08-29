export interface TableData {
  id: number;
  languageFrom: string;
  languageTo: string;
}


export interface TableHeader {
  id: keyof TableData;
  label: string;
}