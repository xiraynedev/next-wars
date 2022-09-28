import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Head from 'next/head';
import { FC } from 'react';
import { v4 } from 'uuid';
import { ApiData } from '../../interfaces/ApiData';

const DisplayPeopleData: FC<ApiData> = ({ pageTitle, results }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {results.map((result: any) => (
        <Card key={v4()} sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant='h5' component='div'>
              Name: {result.name}
            </Typography>
            <Typography variant='h6' component='div'>
              Height: {result.height}
            </Typography>
            <Typography variant='h6' component='div'>
              Mass: {result.mass}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DisplayPeopleData;
