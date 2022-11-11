import { useState } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { v4 } from 'uuid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { PeopleProps, PeopleResult } from '../../interfaces';
import {
  fetchData,
  sortHeight,
  sortMass,
  sortName,
} from '../../utils/functions';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const People: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  const [previousPage, setPreviousPage] = useState<string | null>(
    data.previous,
  );
  const [nextPage, setNextPage] = useState<string | null>(data.next);
  const [results, setResults] = useState<PeopleResult[]>(data.results);

  const updateState = (pageResponse: PeopleProps) => {
    setPreviousPage(pageResponse.previous);
    setNextPage(pageResponse.next);
    setResults(pageResponse.results);
  };

  const handlePreviousClick = async () => {
    if (!previousPage) return;

    const previousPageResponse = (await fetchData(previousPage)) as PeopleProps;

    updateState(previousPageResponse);
  };

  const handleNextClick = async () => {
    if (!nextPage) return;

    const nextPageResponse = (await fetchData(nextPage)) as PeopleProps;

    updateState(nextPageResponse);
  };

  const handleSortName = () => {
    const sortedCopy = sortName([...results]);
    setResults(sortedCopy);
  };

  const handleSortHeight = () => {
    const sortedCopy = sortHeight([...results]);
    setResults(sortedCopy);
  };

  const handleSortMass = () => {
    const sortedCopy = sortMass([...results]);
    setResults(sortedCopy);
  };

  return (
    <>
      <Head>
        <title>People Endpoint</title>
      </Head>
      <Stack marginX={4} marginY={4}>
        <Grid container spacing={2}>
          {results.map((result) => (
            <Grid key={v4()} item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant='h5'
                    fontWeight='bold'
                    component='p'
                    color='primary'
                  >
                    Name: {result.name}
                  </Typography>
                  <Typography variant='body1'>
                    Height: {result.height}
                  </Typography>
                  <Typography variant='body1'>
                    Mass: {result.mass}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          flexWrap='wrap'
          marginY={4}
          gap={2}
        >
          <Button variant='contained' onClick={handlePreviousClick}>
            Previous
          </Button>
          <Button variant='contained' onClick={handleNextClick}>
            Next
          </Button>
          <Link href='/api/people?sort=name'>
            <Button variant='contained' fullWidth>
              JSON Sorted by Name
            </Button>
          </Link>
          <Link href='/api/people?sort=height'>
            <Button variant='contained' fullWidth>
              JSON Sorted by Height
            </Button>
          </Link>
          <Link href='/api/people?sort=mass'>
            <Button variant='contained' fullWidth>
              JSON Sorted by Mass
            </Button>
          </Link>
          <Button variant='contained' onClick={handleSortName}>
            Sort by Name
          </Button>
          <Button variant='contained' onClick={handleSortHeight}>
            Sort by Height
          </Button>
          <Button variant='contained' onClick={handleSortMass}>
            Sort by Mass
          </Button>
          <Link href='/'>
            <Button variant='contained' fullWidth>
              Return to Main Menu
            </Button>
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default People;

export const getStaticProps = async () => {
  const response = await fetch('https://swapi.dev/api/people');
  const data: PeopleProps = await response.json();

  return {
    props: {
      data,
    },
  };
};
