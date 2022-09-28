import { FC } from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ButtonProps } from '../../../interfaces/ButtonProps';

const PlanetButtons: FC<ButtonProps> = (props) => {
  const { handlePreviousClick, handleNextClick } = props;
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} my={4} mx={2}>
      <Button variant='contained' onClick={handlePreviousClick}>
        Previous
      </Button>
      <Button variant='contained' onClick={handleNextClick}>
        Next
      </Button>
      <Link href='/api/planets' passHref>
        <Button variant='contained'>Retrieve JSON</Button>
      </Link>
      <Link href='/' passHref>
        <Button variant='contained'>Return to Main Menu</Button>
      </Link>
    </Stack>
  );
};

export default PlanetButtons;
