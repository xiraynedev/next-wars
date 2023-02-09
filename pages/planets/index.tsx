import { useState } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { v4 } from 'uuid';
import { fetchData, getResidents } from '../../utils/functions';
import { PeopleResult, PlanetProps, PlanetResult } from '../../interfaces';

const Planets: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data,
}) => {
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
    setSpin((prev) => !prev);
  };

  return (
    <>
      <Head>
        <title>Planets Endpoint</title>
      </Head>
      <div className='container mx-auto my-8 w-11/12'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {results.map((result) => (
            <div
              key={v4()}
              className='border text-white bg-blue-600 p-6 text-lg rounded-lg font-light shadow-2xl shadow-slate-500 hover:translate-x-1 transition-all hover:-rotate-6 duration-500 hover:cursor-pointer'
            >
              <p>
                <span className='font-bold'>Name: </span>
                <span>
                  {result.name === 'unknown' ? 'Unknown' : result.name}
                </span>
              </p>
              <p>
                <span className='font-bold'>Population: </span>
                <span>
                  {result.population === 'unknown'
                    ? 'Unknown'
                    : Intl.NumberFormat('en').format(
                        Number.parseInt(result.population),
                      )}
                </span>
              </p>
              <span className='font-bold'>Residents: </span>
              {result.residents.map((resident) => (
                <p key={v4()}>{resident}</p>
              ))}
            </div>
          ))}
        </div>
        <div className='flex flex-col md:flex-row w-full gap-4 text-white text-sm my-10'>
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
          <Link href='/api/planets' passHref legacyBehavior>
            <button
              className='bg-blue-600 shadow-lg shadow-slate-400 px-1 py-3 sm:px-8 rounded transition-all hover:scale-110 ease-in-out hover:bg-slate-200 hover:text-red-900 hover:font-bold duration-1000'
              onClick={handleActivateSpin}
            >
              {spin ? (
                <>
                  <span className='inline-block w-3 h-3 border-2 mr-3 border-blue-600 border-b-slate-900 rounded-full animate-spin'></span>
                  <span>Retrieving JSON...</span>
                </>
              ) : (
                <span>Retrieve JSON</span>
              )}
            </button>
          </Link>
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
