import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { FC } from 'react';
import { ButtonProps } from '../../../interfaces/ButtonProps';

const PeopleButtons: FC<ButtonProps> = (props) => {
  const {
    handlePreviousClick,
    handleNextClick,
    handleSortName,
    handleSortHeight,
    handleSortMass,
  } = props;
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} my={4} mx={2}>
      <Button variant='contained' onClick={handlePreviousClick}>
        Previous
      </Button>
      <Button variant='contained' onClick={handleNextClick}>
        Next
      </Button>
      <Link href='/api/people?sort=name' passHref>
        <Button variant='contained'>JSON Sorted by Name</Button>
      </Link>
      <Link href='/api/people?sort=height' passHref>
        <Button variant='contained'>JSON Sorted by Height</Button>
      </Link>
      <Link href='/api/people?sort=mass' passHref>
        <Button variant='contained'>JSON Sorted by Mass</Button>
      </Link>
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
  );
};

export default PeopleButtons;
