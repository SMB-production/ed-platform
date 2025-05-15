import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { HeaderMobile } from '@/widgets/header/HeaderMobile';
import { Sidebar } from '@/widgets/sidebar/Sidebar';
import { ReactNode } from 'react';

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
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // ~1200px+

  return (
    <>
      {isDesktop ? <Header /> : <HeaderMobile />}
      <Container maxWidth="xl">
        <ContentLayout>
          {isDesktop && <Sidebar />}
          <ContentArea>{children}</ContentArea>
        </ContentLayout>
      </Container>
    </>
  );
};
