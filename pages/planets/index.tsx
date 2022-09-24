import { FC } from 'react';
import Head from 'next/head';

const Planets: FC = (props) => {
  return (
    <>
      <Head>
        <title>Planet Endpoint</title>
      </Head>
      <h1>Planet endpoint data coming soon</h1>
    </>
  );
};

export default Planets;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
