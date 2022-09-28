import { FC, useState } from 'react';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import DisplayPlanetsData from '../../components/DisplayPlanetsData/DisplayPlanetsData';
import PlanetsButtons from '../../components/DisplayButtons/PlanetsButtons.tsx/PlanetsButtons';
import { fetchData } from '../../utils/functions';

const Planets: FC = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [previousPage, setPreviousPage] = useState(data.previous);
  const [nextPage, setNextPage] = useState(data.next);
  const [results, setResults] = useState(data.results);

  const handlePreviousClick = async () => {
    if (!previousPage) return;

    const previousPageResponse = await fetchData(previousPage);

    setPreviousPage(previousPageResponse.previous);
    setNextPage(previousPageResponse.next);
    setResults(previousPageResponse.results);
  };
  const handleNextClick = async () => {
    if (!nextPage) return;

    const nextPageResponse = await fetchData(nextPage);

    setPreviousPage(nextPageResponse.previous);
    setNextPage(nextPageResponse.next);
    setResults(nextPageResponse.results);
  };

  const displayButtonsProps = {
    handlePreviousClick,
    handleNextClick,
  };

  return (
    <>
      <DisplayPlanetsData pageTitle='Planets Endpoint' results={results} />
      <PlanetsButtons {...displayButtonsProps} />
    </>
  );
};

export default Planets;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const response = await fetch('https://swapi.dev/api/planets');
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
