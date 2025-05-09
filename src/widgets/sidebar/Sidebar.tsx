import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#005343',
  color: '#fff',
  width: 250,
  padding: theme.spacing(2),
  borderRadius: 8,
  height: 'fit-content',
}));

const navItems = [
  { label: 'Курсы', path: '/courses' },
  { label: 'Пользователи', path: '/users' },
  { label: 'Банк заданий', path: '/tasks' },
  { label: 'Домашнее задание', path: '/homework' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarContainer>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname.startsWith(item.path)}
            onClick={() => navigate(item.path)}
            sx={{
              color: '#fff',
              borderRadius: 1,
              '&.Mui-selected': {
                backgroundColor: '#218838',
              },
              '&:hover': {
                backgroundColor: '#218838',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </SidebarContainer>
  );
};
