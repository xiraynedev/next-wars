export interface PeopleProps {
  count: number
  next: string
  previous: string
  results: [
    {
      name: string
      height: string
      mass: string
      hair_color: string
      skin_color: string
      eye_color: string
      birth_year: string
      gender: string
      homeworld: string
      films: string[]
      species: string[]
      vehicles: string[]
      starships: string[]
      created: string
      edited: string
      url: string
    }
  ]
}

export interface PeopleResult {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: string[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
}

export interface PlanetProps {
  count: number
  next: string | null
  previous: string | null
  results: [
    {
      name: string
      rotation_period: string
      orbital_period: string
      diameter: string
      climate: string
      gravity: string
      terrain: string
      surface_water: string
      population: string
      residents: string[]
      films: string[]
      created: string
      edited: string
      url: string
    }
  ]
}

export interface PlanetResult {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface ButtonProps {
  handlePreviousClick: () => void
  handleNextClick: () => void
  handleSortName?: () => void
  handleSortHeight?: () => void
  handleSortMass?: () => void
}
