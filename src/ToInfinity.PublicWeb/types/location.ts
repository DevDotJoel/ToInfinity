export interface Municipality {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  municipalities: Municipality[];
}

export interface Country {
  id: number;
  name: string;
  code: string;
  districts: District[];
}

export interface LocationsResponse {
  countries: Country[];
}
