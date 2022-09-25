import { FC } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

const Planets: FC = (props) => {
  return (
    <Box sx={{margin: '10px'}}>
      <Head>
        <title>Planet Endpoint</title>
      </Head>
      <h1>Planet endpoint data coming soon</h1>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
      <Link href='/api/planets' passHref>
        <Button variant='contained'>Retrieve JSON</Button>
      </Link>
      <Link href='/' passHref>
        <Button variant='contained'>Return to Main Menu</Button>
      </Link>
      </Stack>
    </Box>
  );
};

export default Planets;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
