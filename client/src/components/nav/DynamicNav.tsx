import React from 'react';
import dynamic from 'next/dynamic';
import { useTailWindResponsive } from '../../hooks/useTailWindResponsive';

export const DynamicNav: React.FC<Record<string, unknown>> = () => {
  const match = useTailWindResponsive('sm', 'max');
  console.log(match)
  const Nav = dynamic(() =>
    match ? import('./NavBar') : import('./MobileNav'),
  );

  return <Nav />;
};

export default DynamicNav;
