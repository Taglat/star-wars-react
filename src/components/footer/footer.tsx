import css from './footer.module.css'

export function Footer() {
  return (
    <footer className={css.root}>
      <h2 className={css.logo}>
        <a href='https://github.com/Taglat/star-wars-react' target='_blank'>Source Code - StarWars Data</a>
      </h2>
    </footer>
  )
}