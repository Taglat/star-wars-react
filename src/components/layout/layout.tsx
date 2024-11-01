import css from './layout.module.css';

import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type Props = {
  headerSlot?: ReactNode
  navbarSlot?: ReactNode
  footerSlot?: ReactNode 
  children?: ReactNode;
}

export default function Layout({headerSlot, navbarSlot, footerSlot, children}: Props) {
  return (
    <div className={css.root}>
      {headerSlot}
      {navbarSlot}
      <main className={css.content}>
        {children || <Outlet />}
      </main>
      {footerSlot}
    </div>
  )
}
