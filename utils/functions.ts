export const fetchData = async (page: string) => {
  const response = await fetch(page);
  const data = await response.json();

  return data;
};

export const sortName = (resultsCopy: any) => {
  return resultsCopy.sort((a: any, b: any) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
};

export const sortHeight = (resultsCopy: any) => {
  return resultsCopy.sort((a: any, b: any) => {
    return a.height - b.height;
  });
};

export const sortMass = (resultsCopy: any) => {
  return resultsCopy.sort((a: any, b: any) => {
    let replaceA = a.mass;
    let replaceB = b.mass;

    if (a.mass.includes('unknown')) replaceA = a.mass.replace('unknown', '0');
    if (a.mass.includes(',')) replaceA = a.mass.replace(',', '');

    if (b.mass.includes(',')) replaceB = b.mass.replace(',', '');
    if (b.mass.includes('unknown')) replaceB = b.mass.replace('unknown', '0');

    return replaceA - replaceB;
  });
};
