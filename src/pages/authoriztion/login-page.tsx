import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { useForm } from 'react-hook-form';
import { useCurrentUser, useLogin } from '@/shared/api/queries/auth/authApi.ts';

const LoginContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  margin: '120px auto',
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const LoginButton = styled(Button)({
  backgroundColor: '#005343',
  color: '#fff',
  marginTop: 16,
  '&:hover': {
    backgroundColor: '#00422f',
  },
});

const RegisterButton = styled(Button)({
  marginTop: 16,
  color: '#005343',
  textDecoration: 'underline',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#00422f',
  },
});

type LoginFormValues = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const { mutate: login, isPending } = useLogin();
  const { refetch: refetchUser } = useCurrentUser();

  const onSubmit = (data: LoginFormValues) => {
    login(
      {
        email: data.login,
        password: data.password,
      },
      {
        onSuccess: () => {
          refetchUser();
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

      <Container>
        <LoginContainer>
          <Typography variant="h5" align="center" color="#005343" gutterBottom>
            Вход в личный кабинет
          </Typography>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="E-mail или ID"
              placeholder="Введите ваш e-mail или идентификатор"
              margin="normal"
              required
              {...register('login')}
            />
            <TextField
              fullWidth
              label="Пароль"
              placeholder="Введите пароль"
              margin="normal"
              required
              type="password"
              {...register('password')}
            />
            <LoginButton type="submit" fullWidth variant="contained" disabled={isPending}>
              {isPending ? 'Загрузка...' : 'Войти'}
            </LoginButton>
          </Box>
          <Box textAlign="center">
            <RegisterButton variant="text" onClick={() => alert('Навигация на регистрацию')}>
              Зарегистрироваться
            </RegisterButton>
          </Box>
        </LoginContainer>
      </Container>
    </>
  );
};
