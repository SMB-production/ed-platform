import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';

const RegistrationContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  margin: '120px auto',
  padding: theme.spacing(3),
  borderRadius: 8,
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
}));

const ContinueButton = styled(Button)({
  backgroundColor: '#005343',
  color: '#fff',
  marginTop: 16,
  '&:hover': {
    backgroundColor: '#00422f',
  },
});

const LoginButton = styled(Button)({
  marginTop: 16,
  color: '#005343',
  textDecoration: 'underline',
  '&:hover': {
    backgroundColor: 'transparent',
    color: '#00422f',
  },
});

export const RegistrationPage = () => {
  return (
    <>
      <Header />

      <Container>
        <RegistrationContainer>
          <Typography variant="h5" align="center" color="#005343" gutterBottom>
            Регистрация
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              // Обработка формы
            }}
          >
            <TextField fullWidth label="ФИО" margin="normal" required id="fullName" />
            <TextField fullWidth label="E-mail" margin="normal" required type="email" id="email" />
            <TextField
              fullWidth
              label="Дата рождения"
              margin="normal"
              required
              type="date"
              InputLabelProps={{ shrink: true }}
              id="birthDate"
            />
            <TextField fullWidth label="Пароль" margin="normal" required type="password" id="password" />
            <TextField
              fullWidth
              label="Подтвердить пароль"
              margin="normal"
              required
              type="password"
              id="confirmPassword"
            />
            <ContinueButton type="submit" fullWidth variant="contained">
              Продолжить
            </ContinueButton>
          </Box>
          <Box textAlign="center">
            <LoginButton variant="text" onClick={() => alert('Навигация на логин')}>
              Есть аккаунт
            </LoginButton>
          </Box>
        </RegistrationContainer>
      </Container>
    </>
  );
};
