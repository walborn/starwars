import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

export async function getContacts(query?: any) {
  await fakeNetwork(`getContacts:${query}`)
  let contacts = await localforage.getItem('contacts')
  if (!contacts) contacts = []
  if (query) {
    // @ts-ignore
    contacts = matchSorter(contacts, query, { keys: [ 'first', 'last' ] })
  }
  // @ts-ignore
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  // @ts-ignore
  await fakeNetwork()
  const id = Math.random().toString(36).substring(2, 9)
  const contact = { id, createdAt: Date.now() }
  const contacts = await getContacts()
  contacts.unshift(contact)
  await set(contacts)
  return contact
}

export async function getContact(id: string) {
  await fakeNetwork(`contact:${id}`)
  const contacts = await localforage.getItem('contacts')
  // @ts-ignore
  const contact = contacts.find(contact => contact.id === id)
  return contact ?? null
}

// @ts-ignore
export async function updateContact(id, updates) {
  // @ts-ignore
  await fakeNetwork()
  const contacts = await localforage.getItem('contacts')
  // @ts-ignore
  const contact = contacts.find(contact => contact.id === id)
  if (!contact) throw new Error('No contact found for', id)
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export async function deleteContact(id: string) {
  const contacts = await localforage.getItem('contacts')
  // @ts-ignore
  const index = contacts.findIndex(contact => contact.id === id)
  if (index > -1) {
    // @ts-ignore
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

function set(contacts: any) {
  return localforage.setItem('contacts', contacts)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key: any) {
  if (!key) {
    fakeCache = {}
  }

  // @ts-ignore
  if (fakeCache[key]) {
    return
  }

  // @ts-ignore
  fakeCache[key] = true
  return new Promise(res => {
    setTimeout(res, Math.random() * 800)
  })
}