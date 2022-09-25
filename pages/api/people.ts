import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await fetch('https://swapi.dev/api/people');
  const data = await response.json();

  const fullData = { ...data };

  while (fullData.next) {
    await fetch(fullData.next)
      .then((result: any) => result.json())
      .then((resultData) => {
        fullData.next = resultData.next;
        fullData.results.push(resultData.results);
      });
  }

  const sortedCopy = fullData.results.flat().sort((a: any, b: any) => {
    switch (req.query.sort) {
      case 'name':
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      case 'height':
        return a.height - b.height;
      case 'mass':
        let replaceA = a.mass;
        let replaceB = b.mass;

        if (a.mass.includes('unknown'))
          replaceA = a.mass.replace('unknown', '0');
        if (a.mass.includes(',')) replaceA = a.mass.replace(',', '');

        if (b.mass.includes(',')) replaceB = b.mass.replace(',', '');
        if (b.mass.includes('unknown'))
          replaceB = b.mass.replace('unknown', '0');

        return replaceA - replaceB;
      default:
        return;
    }
  });

  res.json(sortedCopy);
}
