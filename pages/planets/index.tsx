import { useEffect, useState } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { v4 } from 'uuid';
import { gsap } from 'gsap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { fetchData, getResidents } from '../../utils/functions';
import { PeopleResult, PlanetProps, PlanetResult } from '../../interfaces';

const Planets: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  useEffect(() => {
    gsap.to('.planets-card', {
      opacity: 1,
      delay: 0.5,
      duration: 1,
    });
  }, []);

  const [previousPage, setPreviousPage] = useState<string | null>(
    data.previous,
  );
  const [nextPage, setNextPage] = useState<string | null>(data.next);
  const [results, setResults] = useState<PlanetResult[]>(data.results);
  const [spin, setSpin] = useState(false);

  const updatePageState = (pageResponse: PlanetProps) => {
    setPreviousPage(pageResponse.previous);
    setNextPage(pageResponse.next);
  };

  const handlePreviousClick = async () => {
    if (!previousPage) return;

    const previousPageResponse = (await fetchData(previousPage)) as PlanetProps;

    updatePageState(previousPageResponse);

    const previousResidentsResponse = await getResidents([
      ...previousPageResponse.results,
    ]);

    setResults(previousResidentsResponse);
  };

  const handleNextClick = async () => {
    if (!nextPage) return;

    const nextPageResponse = (await fetchData(nextPage)) as PlanetProps;

    updatePageState(nextPageResponse);

    const nextResidentsResponse = await getResidents([
      ...nextPageResponse.results,
    ]);

    setResults(nextResidentsResponse);
  };

  const handleActivateSpin = () => {
    setSpin(prev => !prev);
  }

  return (
    <>
      <Head>
        <title>Planets Endpoint</title>
      </Head>
      <Stack
        className='planets-card'
        direction='column'
        marginX={{ xs: '1em', sm: '3em' }}
        marginY='1.5em'
      >
        {results.map((result) => (
          <Card key={v4()} sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography
                variant='h4'
                color='primary'
                fontWeight='bold'
                component='p'
              >
                Name: {result.name === 'unknown' ? 'Unknown' : result.name}
              </Typography>
              <Typography variant='h6' fontWeight='bold' component='p'>
                Population:{' '}
                {result.population === 'unknown'
                  ? 'Unknown'
                  : Intl.NumberFormat('en').format(
                      Number.parseInt(result.population),
                    )}
              </Typography>
              <Typography variant='h6' component='p'>
                Residents:
              </Typography>
              {result.residents.map((resident) => (
                <p className='character-name' key={v4()}>
                  {resident}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant='contained' onClick={handlePreviousClick}>
            Previous
          </Button>
          <Button variant='contained' onClick={handleNextClick}>
            Next
          </Button>
          <Link href='/api/planets' passHref>
            <Button variant='contained' fullWidth onClick={handleActivateSpin}>
                {
                  spin && (
                    <span className='border-8 mr-2 border-b-blue-500 rounded-full animate-spin'></span>
                  )
                }
                <span>Retrieve JSON</span>
            </Button>
          </Link>
          <Link href='/' passHref>
            <Button variant='contained' fullWidth>
              Return to Main Menu
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default Planets;

export const getStaticProps = async () => {
  const response = await fetch('https://swapi.py4e.com/api/planets/');
  const data: PlanetProps = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    const peopleResult: PeopleResult[] = await Promise.all(
      data.results[i].residents.map(async (resident) => {
        const residentResponse = await fetch(resident);
        return await residentResponse.json();
      }),
    );

    data.results[i].residents.length = 0;
    for (const person of peopleResult) {
      data.results[i].residents.push(person.name);
    }
  }

  return {
    props: {
      data,
    },
  };
};
