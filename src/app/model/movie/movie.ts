export interface Movie {
  i: {
    height: number;
    imageUrl: string;
    width: number;
  };
  id: string;
  l: string;  // title
  s: string;  // actors and such
  q?: string; // type
  qid?: string; // type
  rank?: number;
  y?: number; // year
  yr?: string;  // years for series
}
