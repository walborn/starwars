import React from 'react'
import Theme from '@components/Theme'

import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  className?: string
}
const Layout: React.FC<Props> = (props) => (
  <>
    <main className={props.className}>
      {props.children}
    </main>
    <Theme className={styles.theme} />
  </>
)

export default Layout
