import CompanyIconSVG from './favicon.svg';

export const CompanyIcon = ({ onClick }) => (
  <img
    src={CompanyIconSVG}
    alt="Уральский ЕГЭ Центр"
    onClick={onClick}
    style={{ cursor: 'pointer', width: '50px', height: '50px' }}
  />
);
