/* eslint-disable jsx-a11y/anchor-is-valid */
import { SignInButton } from 'components/SignInButton';
import { ActiveLink } from 'components/ActiveLink';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/img/logo.svg" alt="Logo ig.news" />
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a className={styles.active}>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
};
