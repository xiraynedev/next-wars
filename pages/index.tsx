import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { gsap } from 'gsap';

export default function Home() {
  useEffect(() => {
    gsap.to('#people-endpoint', {
      x: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'Bounce.easeOut',
    });
    gsap.to('#planets-endpoint', {
      x: 0,
      duration: 1.5,
      delay: 0.5,
      ease: 'Bounce.easeOut',
    });
    gsap.to('#header', {
      opacity: 1,
      duration: 5,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Next Wars</title>
      </Head>
      <header className='p-8 border-b-2 shadow-lg'>
        <h1 className='text-center text-5xl sm:text-6xl font-thin text-blue-900'>
          Next Wars
        </h1>
      </header>
      <div className='flex flex-col w-9/12 mx-auto sm:flex-row justify-center gap-4 mt-8 text-xs sm:text-lg font-bold'>
        <Link href='/people' passHref>
          <button
            id='people-endpoint'
            className='text-white w-full shadow-lg bg-blue-600 px-1 py-3 sm:px-8 rounded tracking-wider'
          >
            PEOPLE ENDPOINT
          </button>
        </Link>
        <Link href='/planets' passHref>
          <button
            id='planets-endpoint'
            className='text-white w-full shadow-lg bg-blue-600 px-1 py-3 sm:px-8 rounded tracking-widest'
          >
            PLANETS ENDPOINT
          </button>
        </Link>
      </div>
    </>
  );
}
