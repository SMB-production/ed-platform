import { Box, Button, Container, Paper, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { useCurrentUser, useLogout } from '@/shared/api/queries/auth/authApi.ts';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled(Paper)(() => ({
  maxWidth: 800,
  margin: '30px auto',
  padding: '25px',
  backgroundColor: '#fff',
  borderRadius: 10,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const InfoItem = styled(Box)({
  marginBottom: 15,
  fontSize: 16,
  display: 'flex',
  gap: 12,
});

const Label = styled('span')({
  color: '#6c757d',
  minWidth: 140,
});

const Value = styled('span')({
  color: '#005343',
  fontWeight: 500,
});

const TeacherButton = styled(Button)({
  backgroundColor: '#366A75',
  color: '#fff',
  marginTop: 20,
  padding: '10px 25px',
  '&:hover': {
    backgroundColor: '#2a5561',
  },
});

const LogoutButton = styled(Button)({
  marginTop: 24,
  backgroundColor: '#d32f2f',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#b71c1c',
  },
});

export const ProfilePage = () => {
  const { data: user, isLoading, isError } = useCurrentUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  if (isLoading) return <Typography align="center">Загрузка...</Typography>;
  if (isError || !user) return <Typography align="center">Ошибка загрузки данных</Typography>;

  return (
    <>
      <Header />

      <Container>
        <ProfileContainer>
          <Typography variant="h5" gutterBottom>
            Личный кабинет
          </Typography>

          <InfoItem>
            <Label>ФИО:</Label>
            <Value>{user.username}</Value>
          </InfoItem>

          <InfoItem>
            <Label>Электронная почта:</Label>
            <Value>{user.email}</Value>
          </InfoItem>

          <InfoItem>
            <Label>Дата рождения:</Label>
            <Value>{user.date_birth ? new Date(user.date_birth).toLocaleDateString() : 'Н/Д'}</Value>
          </InfoItem>

          <InfoItem>
            <Label>ID пользователя:</Label>
            <Value>#{user.id}</Value>
          </InfoItem>

          <InfoItem>
            <Label>Роль:</Label>
            <Chip
              label={user.is_teacher ? 'Преподаватель' : user.is_admin ? 'Администратор' : 'Ученик'}
              sx={{ backgroundColor: '#366A75', color: '#fff', fontSize: 14 }}
            />
          </InfoItem>

          {user.is_teacher && (
            <TeacherButton variant="contained" onClick={() => alert('Переход в панель преподавателя')}>
              Панель преподавателя
            </TeacherButton>
          )}

          <LogoutButton fullWidth onClick={handleLogout}>
            Выйти из аккаунта
          </LogoutButton>
        </ProfileContainer>
      </Container>
    </>
  );
};
