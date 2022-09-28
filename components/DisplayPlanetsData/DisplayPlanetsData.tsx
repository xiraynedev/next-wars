import Head from 'next/head';
import { FC } from 'react';
import { v4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ApiData } from '../../interfaces/ApiData';
import { getResidents } from '../../utils/functions';

const DisplayPlanetsData: FC<ApiData> = ({ pageTitle, results }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {results.map((result: any, index: number) => (
        <Card key={v4()} sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant='h4' fontWeight='bold' component='p'>
              Name: {result.name}
            </Typography>
            <Typography variant='h6' fontWeight='bold' component='p'>
              Population:{' '}
              {result.population === 'unknown'
                ? 'Unknown'
                : Intl.NumberFormat('en').format(result.population)}
            </Typography>
            <Typography variant='h6' fontWeight='bold' component='p'>
              Residents:{' '}
            </Typography>
            {getResidents(result, index).map((resident: any) => {
              return <p key={v4()}>{resident}</p>;
            })}
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DisplayPlanetsData;
