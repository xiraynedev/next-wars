import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { FC, useState } from 'react';
import { v4 } from 'uuid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { handleSort } from '../../utils/functions';
import Head from 'next/head';

const People: FC = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [previousPage, setPreviousPage] = useState(data.previous);
  const [nextPage, setNextPage] = useState(data.next);
  const [results, setResults] = useState(data.results);

  const handlePreviousClick = async () => {
    if (!previousPage) return;

    const previousPageResponse = await fetch(previousPage);
    const previousPageData = await previousPageResponse.json();

    setPreviousPage(previousPageData.previous);
    setNextPage(previousPageData.next);
    setResults(previousPageData.results);
  };

  const handleNextClick = async () => {
    if (!nextPage) return;

    const nextPageResponse = await fetch(nextPage);
    const nextPageData = await nextPageResponse.json();

    setPreviousPage(nextPageData.previous);
    setNextPage(nextPageData.next);
    setResults(nextPageData.results);
  };

  const handleSortName = () => {
    const resultsCopy = [...results];
    resultsCopy.sort((a: any, b: any) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setResults(resultsCopy);
  };

  const handleSortHeight = () => {
    const resultsCopy = [...results];
    resultsCopy.sort((a: any, b: any) => {
      return a.height - b.height;
    });
    setResults(resultsCopy);
  };

  const handleSortMass = () => {
    const resultsCopy = [...results];
    const sortedCopy = handleSort(resultsCopy);
    setResults(sortedCopy);
  };

  return (
    <>
      <Head>
        <title>People Endpoint</title>
      </Head>
      {results.map((result: any) => {
        return (
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
        );
      })}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} my={4} mx={2}>
        <Button variant='contained' onClick={handlePreviousClick}>
          Previous
        </Button>
        <Button variant='contained' onClick={handleNextClick}>
          Next
        </Button>
        <Button variant='contained' onClick={handleSortName}>
          Sort by Name
        </Button>
        <Button variant='contained' onClick={handleSortHeight}>
          Sort by Height
        </Button>
        <Button variant='contained' onClick={handleSortMass}>
          Sort by Mass
        </Button>
        <Link href='/' passHref>
          <Button variant='contained'>Return to Main Menu</Button>
        </Link>
      </Stack>
    </>
  );
};

export default People;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
