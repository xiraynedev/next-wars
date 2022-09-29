import { FC, useState } from 'react';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { v4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { fetchData, getResidents } from '../../utils/functions';
import { PlanetProps, PlanetResult } from '../../interfaces';

const Planets: FC = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [previousPage, setPreviousPage] = useState<string | null>(data.previous);
  const [nextPage, setNextPage] = useState<string | null>(data.next);
  const [results, setResults] = useState<PlanetResult[]>(data.results);

  const handlePreviousClick = async () => {
    if (!previousPage) return;

    const previousPageResponse = await fetchData(previousPage);

    setPreviousPage(previousPageResponse.previous);
    setNextPage(previousPageResponse.next);

    console.log(previousPage)
    // const previousResidentsResponse = await getResidents([
    //   ...previousPageResponse.results,
    // ]);

    // setResults(previousResidentsResponse);
  };
  const handleNextClick = async () => {
    if (!nextPage) return;

    const nextPageResponse = await fetchData(nextPage);

    setPreviousPage(nextPageResponse.previous);
    setNextPage(nextPageResponse.next);

    console.log(nextPage)

    const nextResidentsResponse = await getResidents([
      ...nextPageResponse.results,
    ]);

    setResults(nextResidentsResponse);
  };

  return (
    <>
      <Head>
        <title>Planets Endpoint</title>
      </Head>
      {results.map((result) => (
        <Card key={v4()} sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant='h4' fontWeight='bold' component='p'>
              Name: {result.name}
            </Typography>
            <Typography variant='h6' fontWeight='bold' component='p'>
              Population:{' '}
              {result.population === 'unknown'
                ? 'Unknown'
                : Intl.NumberFormat('en').format(
                    Number.parseInt(result.population),
                  )}
            </Typography>
            <Typography variant='h6' fontWeight='bold' component='p'>
              Residents:{' '}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} my={4} mx={2}>
        <Button variant='contained' onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant='contained' onClick={handleNextClick}>
          Next
        </Button>
        <Link href='/api/planets' passHref>
          <Button variant='contained'>Retrieve JSON</Button>
        </Link>
        <Link href='/' passHref>
          <Button variant='contained'>Return to Main Menu</Button>
        </Link>
      </Stack>
    </>
  );
};

export default Planets;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data: PlanetProps = await response.json();

  return {
    props: {
      data,
    },
  };
};
