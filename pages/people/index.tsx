import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { FC, useState } from 'react';
import DisplayPeopleData from '../../components/DisplayPeopleData/DisplayPeopleData';
import PeopleButtons from '../../components/DisplayButtons/PeopleButtons.tsx/PeopleButtons';
import {
  fetchData,
  sortHeight,
  sortMass,
  sortName,
} from '../../utils/functions';

const People: FC = ({
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

  const displayButtonsProps = {
    handlePreviousClick,
    handleNextClick,
    handleSortName,
    handleSortHeight,
    handleSortMass,
  };

  return (
    <>
      <DisplayPeopleData pageTitle='People Endpoint' results={results} />
      <PeopleButtons {...displayButtonsProps} />
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
