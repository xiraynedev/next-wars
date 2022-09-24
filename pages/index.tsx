import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Wars</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' sx={{ backgroundColor: '#f3f3f3' }}>
          <Toolbar>
            <Typography
              variant='h2'
              component='h1'
              sx={{ flexGrow: 1, color: 'black', padding: '20px' }}
            >
              Next Wars
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mx={4} my={4}>
        <Link href='/people' passHref>
          <Button variant='contained'>People Endpoint</Button>
        </Link>
        <Link href='/planets' passHref>
          <Button variant='contained'>Planet Endpoint</Button>
        </Link>
      </Stack>
    </>
  );
}
