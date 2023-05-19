import React from 'react'

import Layout from '@/components/Layout'

import styles from './index.module.scss'

const App: React.FC = () => {
  return (
    <Layout className={styles.root}>
      <h1>Star Wars Heroes</h1>
    </Layout>
  )
}

export default App
