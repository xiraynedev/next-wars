import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Planets: FC = (props) => {
  return (
    <>
      <Head>
        <title>Planet Endpoint</title>
      </Head>
      <h1>Planet endpoint data coming soon</h1>
      <Link href='/' passHref>
        <Button variant='contained'>Return to Main Menu</Button>
      </Link>
    </>
  );
};

export default Planets;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
