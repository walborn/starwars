import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
  Link,
} from '@material-ui/core'

import {
  LoaderFunctionArgs,
  useParams,
  NavLink,
} from 'react-router-dom'

import { useQuery, QueryClient } from '@tanstack/react-query'
import fetch from '@/fetch'
import { WithId } from '@/models'
import Loading from '@/components/Loading'

const characterQuery = (characterId: string) => ({
  queryKey: [ 'character', characterId ],
  queryFn: async () => {
    const character = await fetch(`https://swapi.dev/api/people/${characterId}/`)
    if (character.detail) throw new Response('', {
      status: 404,
      statusText: character.detail,
    })
    return character
  },
})

export const loader = (queryClient: QueryClient) => async ({ params }: LoaderFunctionArgs) => {
  const query = characterQuery(params.characterId)
  return await queryClient.ensureQueryData(query)
}

function Character() {
  const { characterId } = useParams()
  const { status, error, data } = useQuery(characterQuery(characterId))

  if (status === 'loading') return <Loading />
  if (status === 'error') return <pre>{JSON.stringify(error, null, 2)}</pre>

  const homeworldUrlParts = data.homeworld.split('/').filter(Boolean)
  const homeworldId = homeworldUrlParts[homeworldUrlParts.length - 1]

  const breadcrumbs = [
    <Link key="characters" component={NavLink} to="/characters">
      Characters
    </Link>,
    <Typography key={characterId} color="primary">
      {data.name}
    </Typography>, 
  ]

  return (
    <div>
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <Typography variant="h2">{data.name}</Typography>
      <TableContainer component={Paper} style={{ maxWidth: '400px' }}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Feature</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Born</TableCell>
              <TableCell>{data.birth_year}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Eyes</TableCell>
              <TableCell>{data.eye_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hair</TableCell>
              <TableCell>{data.hair_color}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              <TableCell>{data.height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mass</TableCell>
              <TableCell>{data.mass}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Homeworld</TableCell>
              <TableCell>
                <Homeworld id={homeworldId} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Typography variant="h4">Films</Typography>
      {data.films.map((film: string) => {
        const filmUrlParts = film.split('/').filter(Boolean)
        const filmId = filmUrlParts[filmUrlParts.length - 1]
        return <Film id={filmId} key={`Film-${filmId}`} />
      })}
    </div>
  )
}

export default Character


function Homeworld({ id }: WithId) {
  const { data, status } = useQuery({
    queryKey: [ 'homeworld', id ],
    queryFn: () => fetch(`https://swapi.dev/api/planets/${id}/`),
  })

  if (status !== 'success') return null

  return data.name
}

function Film({ id }: WithId) {
  const { data, status } = useQuery({
    queryKey: [ 'film', id ],
    queryFn: () => fetch(`https://swapi.dev/api/films/${id}/`),
  })

  if (status !== 'success') return null

  return (
    <article key={id}>
      <Typography variant="h6">
        {data.episode_id}. {data.title}
      </Typography>
    </article>
  )
}