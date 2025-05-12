import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useAllUsers, useMakeAdmin, useMakeTeacher } from '@/shared/api/queries/users/api.ts';
import { useNavigate } from 'react-router-dom';

export const UsersPage = () => {
  const { data, isLoading, isError, refetch } = useAllUsers();
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

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          Пользователи
        </Typography>

        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка при загрузке</Typography>}

        {data && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#e9ecef' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Роль</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email || 'Н/Д'}</TableCell>
                    <TableCell>
                      {user.is_admin ? 'Администратор' : user.is_teacher ? 'Преподаватель' : 'Ученик'}
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => navigate(`/users/${user.id}`)}>
                        Профиль
                      </Button>
                      {!user.is_teacher && (
                        <Button size="small" onClick={() => handleSetRole(user.id)} sx={{ ml: 1 }}>
                          Сделать преподавателем
                        </Button>
                      )}
                      {!user.is_admin && (
                        <Button size="small" onClick={() => handleSetAdmin(user.id)} sx={{ ml: 1 }}>
                          Сделать админом
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </SidebarLayout>
  );
};
