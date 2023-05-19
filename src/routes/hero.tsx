import React from 'react'
import {
  useLoaderData,
  LoaderFunctionArgs,
} from 'react-router-dom'
import { getContact } from '@/heroes'

interface Hero {
  id: string
  name: string
}

export async function loader({ params }: LoaderFunctionArgs) {
  const hero = await getContact(params.heroId)
  if (!hero) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    })
  }
  return { hero }
}
export default function Hero() {
  const { hero } = useLoaderData() as { hero: Hero }

  return (
    <div id="contact">
      <h1>
        {hero.name}
      </h1>
    </div>
  )
}
