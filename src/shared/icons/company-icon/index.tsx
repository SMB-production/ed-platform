import CompanyIconSVG from './favicon.svg';
import Logo from './ural_ege_logo.svg';
import { useMediaQuery, useTheme } from '@mui/material';

export const CompanyIcon = ({ onClick }) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // ~1200px+

  if (isDesktop) {
    return <img src={Logo} alt="Уральский ЕГЭ Центр" onClick={onClick} style={{ cursor: 'pointer', height: '50px' }} />;
  }

  return (
    <img
      src={CompanyIconSVG}
      alt="Уральский ЕГЭ Центр"
      onClick={onClick}
      style={{ cursor: 'pointer', width: '50px', height: '50px' }}
    />
  );
};
