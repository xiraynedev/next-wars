export const handleSort = (resultsCopy: any) => {
    return resultsCopy.sort((a: any, b: any) => {
      let replaceA = a.mass;
      let replaceB = b.mass;

      if (a.mass.includes('unknown')) replaceA = a.mass.replace('unknown', '0');
      if (a.mass.includes(',')) replaceA = a.mass.replace(',', '');

      if (b.mass.includes(',')) replaceB = b.mass.replace(',', '');
      if (b.mass.includes('unknown')) replaceB = b.mass.replace('unknown', '0');

      return replaceA - replaceB;
    });
}