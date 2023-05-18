import React from 'react'

import { icons } from '@assets/icons'
import Layout from '@components/Layout'

import styles from './index.module.scss'

const App: React.FC = () => {
  const [ count, setCount ] = React.useState(0)
  const handleCounter = () => setCount(prev => prev + 1)

  return (
    <Layout className={styles.root}>
      <div>
        <a href="https://webpack.js.org" target="_blank" rel="noreferrer">
          <img src={icons.webpack} className={styles.logo} alt="Webpack logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
          <img src={icons.typescript} className={styles.logo} alt="TypeScript logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer" className={styles.rotate}>
          <img src={icons.react} className={styles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Webpack + React + TS</h1>
      <button onClick={handleCounter}>
        count is {count}
      </button>
    </Layout>
  )
}

export default App
