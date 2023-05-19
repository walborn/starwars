import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  const errorMessage: string = React.useMemo(() => {
    if (isRouteErrorResponse(error)) return error.error?.message || error.statusText
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Unknown error'
  }, [ error ])

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}