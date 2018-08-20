import { h } from "preact";
import { Link } from "preact-router/match";
import style from "./style";

const Header = () => (
  <header class={style.header}>
    <h1>preact | 004-router</h1>
    <nav>
      <Link activeClassName={style.active} href="/">
        Users
      </Link>
      <Link activeClassName={style.active} href="/createUser">
        createUser
      </Link>
    </nav>
  </header>
);

export default Header;
