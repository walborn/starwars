import React from 'react'
import { Outlet } from 'react-router-dom'

import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default function Layout() {
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <main className={classes.main}>
        <Outlet />
      </main>
    </Container>
  )
}

const useStyles = makeStyles(() => ({
  main: {
    margin: '0 auto',
    padding: '16px',
  },
}))
