import { useEffect, useState } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { v4 } from 'uuid';
import { gsap } from 'gsap';
import { PeopleProps, PeopleResult } from '../../interfaces';
import {
  fetchData,
  sortHeight,
  sortMass,
  sortName,
} from '../../utils/functions';

const People: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
  useEffect(() => {
    gsap.to('.people-card', {
      opacity: 1,
      delay: 0.3,
      duration: 1,
    });
  }, []);

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
      <div className='container mx-auto my-8 w-11/12'>
        <div className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4'>
          {results.map((result) => (
            <div
              key={v4()}
              className='border text-white bg-blue-600 p-6 text-lg rounded-lg font-light shadow-2xl shadow-slate-500 hover:translate-x-1 transition-all hover:-rotate-6 duration-500 hover:cursor-pointer'
            >
              <p>
                <span className='font-bold'>Name: </span>
                {result.name}
              </p>
              <p>
                <span className='font-bold'>Height: </span>
                Height: {result.height}
              </p>
              <p>
                <span className='font-bold'>Mass: </span>
                Mass: {result.mass}
              </p>
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row md:flex-wrap w-full gap-4 text-white text-sm my-10'>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handlePreviousClick}
          >
            Previous
          </button>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handleNextClick}
          >
            Next
          </button>
          <Link href='/api/people?sort=name' passHref legacyBehavior>
            <button className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'>
              JSON Name Sort
            </button>
          </Link>
          <Link href='/api/people?sort=height' passHref legacyBehavior>
            <button className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'>
              JSON Height Sort
            </button>
          </Link>
          <Link href='/api/people?sort=mass' passHref legacyBehavior>
            <button className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'>
              JSON Mass Sort
            </button>
          </Link>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handleSortName}
          >
            Name Sort
          </button>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handleSortHeight}
          >
            Height Sort
          </button>
          <button
            className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
            onClick={handleSortMass}
          >
            Mass Sort
          </button>
          <Link href='/' passHref legacyBehavior>
            <button className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'>
              Return to Main Menu
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default People;

export const getStaticProps = async () => {
  const response = await fetch('https://swapi.py4e.com/api/people/');
  const data: PeopleProps = await response.json();

  return {
    props: {
      data,
    },
  };
};
