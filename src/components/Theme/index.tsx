import React from 'react'
import clsx from 'clsx'

import styles from './index.module.scss'

interface Props {
  className: string
}

const Theme: React.FC<Props> = ({ className }) => {
  const [ theme, setTheme ] = React.useState(localStorage.getItem('theme') || 'dark')

  React.useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  const handleChange = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div
      className={clsx(className, styles.root, styles[theme])}
      onClick={handleChange}
    />
  )
}

export default Theme