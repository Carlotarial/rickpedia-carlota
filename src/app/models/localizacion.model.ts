export interface Localizacion {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface RespuestaLocalizaciones {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Localizacion[];
}
