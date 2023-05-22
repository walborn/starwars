export interface WithId {
  id: string
}

export type ResourceUrl = string

export interface Character {
  name: string // The name of this person.
  birth_year: string // The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.
  eye_color: string // The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.
  gender: string // The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.
  hair_color: string // The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.
  height: string // The height of the person in centimeters.
  mass: string // The mass of the person in kilograms.
  skin_color: string // The skin color of this person.
  homeworld: string // The URL of a planet resource, a planet that this person was born on or inhabits.
  films: ResourceUrl[] // An array of film resource URLs that this person has been in.
  species: ResourceUrl[] // An array of species resource URLs that this person belongs to.
  starships: ResourceUrl[] // An array of starship resource URLs that this person has piloted.
  vehicles: ResourceUrl[] // An array of vehicle resource URLs that this person has piloted.
  url: string // the hypermedia URL of this resource.
  created: string // the ISO 8601 date format of the time that this resource was created.
  edited: string // the ISO 8601 date format of the time that this resource was edited.
}

export interface Film {
  title: string // The title of this film
  episode_id: number // The episode number of this film.
  opening_crawl: string // The opening paragraphs at the beginning of this film.
  director: string // The name of the director of this film.
  producer: string // The name(s) of the producer(s) of this film. Comma separated.
  release_date: Date // The ISO 8601 date format of film release at original creator country.
  species: ResourceUrl[] // An array of species resource URLs that are in this film.
  starships: ResourceUrl[] // An array of starship resource URLs that are in this film.
  vehicles: ResourceUrl[] // An array of vehicle resource URLs that are in this film.
  characters: ResourceUrl[] // An array of people resource URLs that are in this film.
  planets: ResourceUrl[] // An array of planet resource URLs that are in this film.
  url: string // the hypermedia URL of this resource.
  created: string // the ISO 8601 date format of the time that this resource was created.
}