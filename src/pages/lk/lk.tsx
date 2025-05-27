import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser, useLogout } from '@/shared/api/queries/auth/authApi';
import { useDeleteAccount } from '@/shared/api/queries/deleteAccountApi';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import { User } from '@/shared/api/queries/auth/model.ts';
import { ReactNode } from 'react';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout.tsx';

export const ProfilePage = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const { mutate: deleteAccount } = useDeleteAccount();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить аккаунт? Это действие необратимо.')) {
      deleteAccount(undefined, {
        onSuccess: () => {
          localStorage.removeItem('auth_token');
          navigate('/login');
        },
      });
    }
  };

  const Layout = ({ user, children }: { user: User; children: ReactNode }) => {
    if (user.is_admin || user.is_teacher) return <SidebarLayout>{children}</SidebarLayout>;

    return <SidebarLayout>{children}</SidebarLayout>;
  };

  if (isLoading) return <Typography align="center">Загрузка...</Typography>;
  if (isError || !user) return <Typography align="center">Ошибка загрузки данных</Typography>;

  return (
    <Layout user={user}>
      <Container maxWidth="md">
        <Paper
          sx={{
            borderRadius: 4,
            p: 4,
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            mb: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Личный кабинет
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={4}>
            {/* Левая часть — информация */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Аватар
                  </Typography>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #ddd',
                    }}
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt="Аватар"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#f0f0f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 14,
                          color: '#999',
                        }}
                      >
                        Нет фото
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Typography color="text.secondary">Username</Typography>
                  <Typography>{user.username || 'Н/Д'}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Фамилия</Typography>
                  <Typography>{user.last_name || 'Н/Д'}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Имя</Typography>
                  <Typography>{user.first_name || 'Н/Д'}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Email</Typography>
                  <Typography>{user.email || 'Н/Д'}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Дата рождения</Typography>
                  <Typography>{user.date_birth ? new Date(user.date_birth).toLocaleDateString() : 'Н/Д'}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">ID пользователя</Typography>
                  <Typography>#{user.id}</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">Роль</Typography>
                  <Chip
                    label={user.is_teacher ? 'Преподаватель' : user.is_admin ? 'Администратор' : 'Ученик'}
                    color={user.is_admin ? 'warning' : user.is_teacher ? 'info' : 'default'}
                  />
                </Box>
              </Stack>
            </Grid>

            {/* Правая часть — действия */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                {user.is_teacher && (
                  <Button variant="contained" color="primary" onClick={() => navigate('/courses')}>
                    Панель преподавателя
                  </Button>
                )}
                <Button variant="contained" onClick={handleLogout}>
                  Выйти из аккаунта
                </Button>
                <Button variant="outlined" onClick={() => navigate('/profile/edit')}>
                  Редактировать профиль
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                  Удалить аккаунт
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
};
