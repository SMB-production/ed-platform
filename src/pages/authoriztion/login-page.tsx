import { Box, Button, Container, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { useForm } from 'react-hook-form';
import { useCurrentUser, useLogin } from '@/shared/api/queries/auth/authApi.ts';
import { useNavigate } from 'react-router-dom';

const LoginCard = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    borderRadius: 12,
  },
}));

type LoginFormValues = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { mutate: login, isPending } = useLogin();
  const { refetch: refetchUser } = useCurrentUser();
  const navigate = useNavigate();
  const theme = useTheme();

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        email: data.login,
        password: data.password,
      },
      {
        onSuccess: () => {
          refetchUser();
          navigate('/profile');
        },
        onError: () => {
          alert('Неверный логин или пароль');
        },
      },
    );
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" align="center" fontWeight={600} color="primary" gutterBottom>
          Вход в личный кабинет
        </Typography>

        <LoginCard>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="E-mail или ID"
                placeholder="Введите ваш e-mail или идентификатор"
                required
                {...register('login')}
              />
              <TextField
                fullWidth
                label="Пароль"
                placeholder="Введите пароль"
                required
                type="password"
                {...register('password')}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isPending}
                sx={{
                  mt: 1,
                  backgroundColor: '#005343',
                  '&:hover': { backgroundColor: '#00422f' },
                }}
              >
                {isPending ? 'Загрузка...' : 'Войти'}
              </Button>

              <Button
                onClick={() => navigate('/registration')}
                variant="text"
                fullWidth
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                }}
              >
                Ещё нет аккаунта? Зарегистрироваться
              </Button>
            </Stack>
          </Box>
        </LoginCard>
      </Container>
    </>
  );
};
