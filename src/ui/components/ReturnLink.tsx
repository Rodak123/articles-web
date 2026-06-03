import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Typography } from './Typography';
import { ROUTES } from '../../routes';
import { Link } from 'react-router';

export const ReturnLink: React.FC = () => {
  return (
    <Link to={ROUTES.HOME()} className='group'>
      <div className='flex flex-row items-center gap-2'>
        <div className='relative w-4 h-auto aspect-square'>
          <ArrowLeftIcon className='w-full h-full absolute transition-all duration-300 left-0 group-hover:-left-2 group-focus:-left-2' />
        </div>
        <Typography>Return</Typography>
      </div>
    </Link>
  );
};
