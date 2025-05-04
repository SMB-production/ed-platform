import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';

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

export const LoginPage = () => {
  return (
    <>
      <Header />

      <Container>
        <LoginContainer>
          <Typography variant="h5" align="center" color="#005343" gutterBottom>
            Вход в личный кабинет
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              // логика входа
            }}
          >
            <TextField
              fullWidth
              label="E-mail или ID"
              placeholder="Введите ваш e-mail или идентификатор"
              margin="normal"
              required
              id="login"
            />
            <TextField
              fullWidth
              label="Пароль"
              placeholder="Введите пароль"
              margin="normal"
              required
              type="password"
              id="password"
            />
            <LoginButton type="submit" fullWidth variant="contained">
              Войти
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
