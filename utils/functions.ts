import { PlanetResult, PeopleResult } from './../interfaces/index';

export const fetchData = async (page: string) => {
  const response = await fetch(page);
  const data = await response.json();

  return data;
};

export const sortName = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const sortHeight = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    return Number.parseInt(a.height) - Number.parseInt(b.height);
  });
};

export const sortMass = (resultsCopy: PeopleResult[]) => {
  return resultsCopy.sort((a, b) => {
    let replaceA = a.mass;
    let replaceB = b.mass;

    if (a.mass.includes('unknown')) replaceA = a.mass.replace('unknown', '0');
    if (a.mass.includes(',')) replaceA = a.mass.replace(',', '');

    if (b.mass.includes(',')) replaceB = b.mass.replace(',', '');
    if (b.mass.includes('unknown')) replaceB = b.mass.replace('unknown', '0');

    return Number.parseInt(replaceA) - Number.parseInt(replaceB);
  });
};

export const getResidents = async (results: PlanetResult[]) => {
  const planets = [...results];

  for (let i = 0; i < planets.length; i++) {
    const residents: string[] = [];
    for (let j = 0; j < planets[i].residents.length; j++) {
      residents.push(planets[i].residents[j]);
    }
    await Promise.all(
      residents.map(
        async (resident) =>
          await fetch(resident).then((residentResponse) =>
            residentResponse.json(),
          ),
      ),
    ).then((residentData) => {
      residents.length = 0;
      residentData.forEach((person) => {
        residents.push(person.name);
      });
    });
    planets[i].residents = residents;
  }

  return planets;
};
