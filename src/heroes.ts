import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

interface Hero {
  id: number
  name: string
}

const HEROES = [
  {
    id: 1,
    name: 'Luke Skywalker',
  },
  {
    id: 2,
    name: 'C-3PO',
  },
  {
    id: 3,
    name: 'R2-D2',
  },
  {
    id: 4,
    name: 'Darth Vader',
  },
  {
    id: 5,
    name: 'Leia Organa',
  },
] as Hero[]
export async function getHeroes(query?: string) {
  await fakeNetwork(`getHeroes:${query}`)
  localforage.setItem('heroes', HEROES)
  let heroes = await localforage.getItem('heroes') as Hero[]
  if (!heroes) heroes = []
  if (query) {
    heroes = matchSorter(heroes, query, { keys: [ 'name' ] })
  }
  return heroes.sort(sortBy('last', 'created'))
}

export async function getContact(id: string) {
  await fakeNetwork(`hero:${id}`)
  const heroes = await localforage.getItem('heroes') as Hero[]
  return heroes.find(hero => hero.id === +id) ?? null
}


// fake a cache so we don't slow down stuff we've already seen
let fakeCache: Record<string, boolean> = {}

async function fakeNetwork(key: string) {
  if (!key) fakeCache = {}

  if (fakeCache[key]) return

  fakeCache[key] = true
  return new Promise(rs => setTimeout(rs, Math.random() * 800))
}