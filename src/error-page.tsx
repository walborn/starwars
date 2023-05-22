import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import { Typography } from '@material-ui/core'

export default function ErrorPage() {
  const error = useRouteError()

  const errorMessage: string = React.useMemo(() => {
    if (isRouteErrorResponse(error)) return error.error?.message || error.statusText
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Unknown error'
  }, [ error ])

  return (
    <>
      <Typography variant="h1">Oops!</Typography>
      <p>Sorry, an unexpected error has occurred.</p>
      <p><i>{errorMessage}</i></p>
    </>
  )
}