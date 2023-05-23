import React from 'react'
import clsx from 'clsx'

import {
  NavLink,
  Form,
  useNavigation,
  useSubmit,
  LoaderFunctionArgs,
  useSearchParams,
} from 'react-router-dom'
import { useQuery, QueryClient } from '@tanstack/react-query'

import { Typography, Link } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

import fetch from '@/fetch'
import { Character } from '@/models'
import Loading from '@/components/Loading'

const charactersQuery = (searchParams: URLSearchParams) => {
  const url = new URL(`https://swapi.dev/api/people/?${searchParams}`)

  return {
    queryKey: [ 'characters', searchParams.get('search') || '', searchParams.get('page') || '1' ],
    queryFn: () => fetch(url),
  }
}

export const loader = (queryClient: QueryClient) => async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const query = charactersQuery(url.searchParams)
  return await queryClient.ensureQueryData(query)
}

export default function Characters() {
  const styles = useStyles()
  const submit = useSubmit()
  const navigation = useNavigation()
  const [ searchParams, setSearchParams ] = useSearchParams()
  const { status, error, data } = useQuery(charactersQuery(searchParams))
  const [ count, setCount ] = React.useState(0)
  const searching = new URLSearchParams(navigation.location?.search).has('search')

  React.useEffect(() => {
    if (data?.count) setCount(data.count)
  }, [ data ])

  if (status === 'error') return <pre>{JSON.stringify(error, null, 2)}</pre>

  const handlePaginate = (e: React.MouseEvent<HTMLButtonElement>, p: number) => {
    setSearchParams((prev: URLSearchParams) => {
      prev.set('page', `${p}`)
      return prev
    })
  }

  return (
    <div style={{ padding: '24px 0' }}>
      <Typography variant="h2">Characters</Typography>
      <Form className="search-form" role="search">
        <input
          id="search"
          className={clsx(searching && 'loading')}
          aria-label="Search characters"
          placeholder="Search"
          type="search"
          name="search"
          defaultValue={searchParams.get('search')}
          onChange={(event) => {
            submit(event.currentTarget.form, {
              replace: !searchParams.has('search'),
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
        />
      </Form>
      <Pagination
        className={styles.pagination}
        count={Math.ceil(count / 10)}
        page={Number(searchParams.get('page')) || 1}
        onChange={handlePaginate}
      />
      {
        status === 'loading'
          ? <Loading />
          : data && data?.results?.map((character: Character) => {
            const characterId = character.url.split('/').filter(Boolean).at(-1)
            return (
              <article key={characterId} style={{ margin: '16px 0 0' }}>
                <Link component={NavLink} to={`/characters/${characterId}`}>
                  <Typography variant="h6">{character.name}</Typography>
                </Link>
              </article>
            )
          })}
     
    </div>
  )
}

const useStyles = makeStyles(() => ({
  pagination: {
    margin: '16px 0',
    textAlign: 'center',
    padding: '16px',
    '& ul': {
      justifyContent:'center',
    },
  },
}))
