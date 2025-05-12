import { List, ListItemButton, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@/shared/api/queries/auth/authApi.ts';

const SidebarContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: '#005343',
  color: '#fff',
  width: 250,
  padding: theme.spacing(2),
  borderRadius: 8,
  height: 'fit-content',
}));

type NavItem = {
  label: string;
  path: string;
  roles: ('student' | 'teacher' | 'admin')[];
};

const navItems: NavItem[] = [
  { label: 'Курсы', path: '/courses', roles: ['student', 'teacher', 'admin'] },
  { label: 'Пользователи', path: '/users', roles: ['admin'] },
  { label: 'Банк заданий', path: '/task-bank', roles: ['teacher', 'admin'] },
  { label: 'Домашнее задание', path: '/homework/all', roles: ['teacher', 'admin'] },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useCurrentUser();
  if (!user) return null;

  const userRole: 'student' | 'teacher' | 'admin' = user.is_admin ? 'admin' : user.is_teacher ? 'teacher' : 'student';

  const visibleItems = navItems.filter((item) => item.roles.includes(userRole));

  return (
    <SidebarContainer>
      <List sx={{ width: '100%' }}>
        {visibleItems.map((item) => (
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
