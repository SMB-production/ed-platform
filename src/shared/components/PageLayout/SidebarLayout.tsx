import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar/Sidebar';

interface SidebarLayoutProps {
  children: ReactNode;
}

const ContentLayout = styled(Box)({
  display: 'flex',
  marginTop: 32,
  gap: 20,
});

const ContentArea = styled(Box)({
  flex: 1,
});

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <>
      <Header />
      <Container maxWidth="xl">
        <ContentLayout>
          <Sidebar />
          <ContentArea>{children}</ContentArea>
        </ContentLayout>
      </Container>
    </>
  );
};
