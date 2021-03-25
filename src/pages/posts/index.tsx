import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Head from 'next/head';
import { getPrismicClient } from 'services/prismic';
import styles from './styles.module.scss';

const Posts = () => {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2012</time>
            <strong>React Fragments: An overview</strong>
            <p>
              React Fragments do not produce any extra elements in the DOM,
              which means that a Fragment’s child components will be rendered
              without any wrapping DOM node. React Fragments enable you to group
              multiple sibling components without introducing any unnecessary
              markup in the rendered HTML.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2012</time>
            <strong>React Fragments: An overview</strong>
            <p>
              React Fragments do not produce any extra elements in the DOM,
              which means that a Fragment’s child components will be rendered
              without any wrapping DOM node. React Fragments enable you to group
              multiple sibling components without introducing any unnecessary
              markup in the rendered HTML.
            </p>
          </a>
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 100,
    },
  );

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {},
    revalidate: 60 * 60 * 24, // 24 hs
  };
};
