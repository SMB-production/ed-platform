import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useAllUsers, useMakeAdmin, useMakeTeacher } from '@/shared/api/queries/users/api.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const UsersPage = () => {
  const [filters, setFilters] = useState({
    id: '',
    first_name: '',
    last_name: '',
    role: '', // admin | teacher | student
  });

  const [page, setPage] = useState(0);
  const pageSize = 20;

  const queryParams = {
    page: page + 1,
    pageSize,
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
  };

  const { data, isLoading, isError, refetch } = useAllUsers(queryParams);

  const makeTeacher = useMakeTeacher();
  const makeAdmin = useMakeAdmin();
  const navigate = useNavigate();

  const handleSetRole = (id: number) => {
    makeTeacher.mutate(id, {
      onSuccess: () => {
        alert(`Пользователь #${id} стал преподавателем`);
        refetch();
      },
    });
  };

  const handleSetAdmin = (id: number) => {
    makeAdmin.mutate(id, {
      onSuccess: () => {
        alert(`Пользователь #${id} стал администратором`);
        refetch();
      },
    });
  };

  const handleReset = () => {
    setFilters({
      first_name: '',
      last_name: '',
      role: '',
      id: '',
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Пользователи
        </Typography>

        <Box display="flex" gap={2} mb={3} flexWrap="wrap">
          <TextField
            label="id"
            size={'small'}
            value={filters.id}
            onChange={(e) => setFilters((prev) => ({ ...prev, id: e.target.value }))}
          />
          <TextField
            label="Фамилия"
            size={'small'}
            value={filters.last_name}
            onChange={(e) => setFilters((prev) => ({ ...prev, last_name: e.target.value }))}
          />
          <TextField
            label="Имя"
            size={'small'}
            value={filters.first_name}
            onChange={(e) => setFilters((prev) => ({ ...prev, first_name: e.target.value }))}
          />

          <Select
            displayEmpty
            size={'small'}
            value={filters.role}
            onChange={(e) => setFilters((prev) => ({ ...prev, role: e.target.value }))}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">Все роли</MenuItem>
            <MenuItem value="admin">Администраторы</MenuItem>
            <MenuItem value="teacher">Преподаватели</MenuItem>
            <MenuItem value="student">Ученики</MenuItem>
          </Select>
          <Button variant="outlined" onClick={handleReset}>
            Сбросить фильтры
          </Button>
        </Box>

        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка при загрузке</Typography>}

        {data && (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: '#e9ecef' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Имя</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Роль</TableCell>
                    <TableCell>Дата рождения</TableCell>
                    <TableCell>Действия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.results.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{`${user.last_name} ${user.first_name}`}</TableCell>
                      <TableCell>{user.email || 'Н/Д'}</TableCell>

                      <TableCell>
                        {user.is_admin ? 'Администратор' : user.is_teacher ? 'Преподаватель' : 'Ученик'}
                      </TableCell>
                      <TableCell>{user.date_birth || 'Н/Д'}</TableCell>
                      <TableCell>
                        <UserActionsMenu
                          isTeacher={user.is_teacher}
                          isAdmin={user.is_admin}
                          onProfile={() => navigate(`/users/${user.id}`)}
                          onMakeTeacher={() => handleSetRole(user.id)}
                          onMakeAdmin={() => handleSetAdmin(user.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={data.count}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[pageSize]} // фиксированный размер
            />
          </>
        )}
      </Container>
    </SidebarLayout>
  );
};

interface UserActionsMenuProps {
  isTeacher: boolean;
  isAdmin: boolean;
  onMakeTeacher: () => void;
  onMakeAdmin: () => void;
  onProfile: () => void;
}

export const UserActionsMenu = ({
  isTeacher,
  isAdmin,
  onMakeTeacher,
  onMakeAdmin,
  onProfile,
}: UserActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        aria-controls={open ? 'user-actions-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        Действия
      </Button>

      <Menu
        id="user-actions-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'user-actions-button' }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onProfile();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Профиль</ListItemText>
        </MenuItem>

        {!isTeacher && (
          <MenuItem
            onClick={() => {
              handleClose();
              onMakeTeacher();
            }}
          >
            <ListItemIcon>
              <SchoolIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Сделать преподавателем</ListItemText>
          </MenuItem>
        )}

        {!isAdmin && (
          <MenuItem
            onClick={() => {
              handleClose();
              onMakeAdmin();
            }}
          >
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Сделать админом</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
