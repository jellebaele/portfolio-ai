import PageContainer from '@/components/layout/PageContainer';
import { NavLink } from 'react-router';

const NotFound = () => {
  return (
    <div className='flex h-dvh items-center justify-center bg-muted'>
      <PageContainer scrollable={false}>
        <div className='flex h-full flex-col items-center justify-center text-center'>
          <h1 className='mb-4 text-4xl font-bold'>404</h1>
          <p className='mb-4 text-xl text-muted-foreground'>Oops! Page not found</p>
          <NavLink to='/' className='text-primary underline hover:text-primary/90' end>
            Return to Home
          </NavLink>
        </div>
      </PageContainer>
    </div>
  );
};

export default NotFound;
