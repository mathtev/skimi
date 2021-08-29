export interface TableData {
  languageFrom: string;
  languageTo: string;
}


export interface TableHeader {
  id: keyof TableData;
  label: string;
}