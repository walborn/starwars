import React from 'react'
import {
  Outlet,
  NavLink,
  useLoaderData,
  Form,
  useNavigation,
  useSubmit,
  LoaderFunctionArgs,
} from 'react-router-dom'
import { getHeroes } from '@/heroes'

interface Hero {
  id: string
  name: string
}

interface HeroesLoaderData {
  heroes: Hero[]
  q: string
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const q = url.searchParams.get('q')
  const heroes = await getHeroes(q)
  return { heroes, q }
}

export default function Root() {
  const { heroes, q } = useLoaderData() as HeroesLoaderData
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

  React.useEffect(() => {
    const input = document.getElementById('q') as HTMLInputElement
    input.value = q
  }, [ q ])

  return (
    <>
      <div id="sidebar">
        <h1>Star Wars Heroes</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q === null
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
        </div>
        <nav>
          {heroes.length ? (
            <ul>
              {heroes.map((hero: Hero) => (
                <li key={hero.id}>
                  <NavLink
                    to={`heroes/${hero.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? 'active'
                        : isPending
                          ? 'pending'
                          : ''
                    }
                  >
                    {hero.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No match</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  )
}
