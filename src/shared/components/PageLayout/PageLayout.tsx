import { ReactNode } from 'react';
import { Header } from '@/widgets/header';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
