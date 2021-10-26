export interface TableData {
  id: number;
  wordFrom: string;
  wordTo: string;
}


export interface TableHeader {
  id: keyof TableData;
  label?: string;
}