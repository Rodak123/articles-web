import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Typography } from './Typography';
import { ROUTE_PATHS } from '../../config';
import { Link } from 'react-router';

export const ReturnLink: React.FC = () => {
  return (
    <Link to={ROUTE_PATHS.HOME()} className='group' viewTransition>
      <div className='flex flex-row items-center gap-2'>
        <div className='relative w-4 h-auto aspect-square'>
          <ArrowLeftIcon className='w-full h-full absolute transition-all duration-300 left-0 group-hover:-left-2 group-focus:-left-2' />
        </div>
        <Typography>Return</Typography>
      </div>
    </Link>
  );
};
