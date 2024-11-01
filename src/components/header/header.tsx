import css from './header.module.css'

export function Header() {
  return (
    <header className={css.root}>
      <h2 className={css.logo}>
        <span>StarWars</span> - Data
      </h2>
    </header>
  )
}