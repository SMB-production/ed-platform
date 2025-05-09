import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { useForm } from 'react-hook-form';
import { RegisterDto } from '@/shared/api/queries/auth/model.ts';
import { useRegister } from '@/shared/api/queries/auth/authApi.ts';

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

type FormValues = {
  fullName: string;
  email: string;
  birthDate: string;
  password: string;
  confirmPassword: string;
};

export const RegistrationPage = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = (data: FormValues) => {
    // const [firstName, lastName = ''] = data.fullName.split(' ');

    const payload: RegisterDto = {
      username: data.fullName, // если API ожидает ФИО в одном поле
      email: data.email,
      password: data.password,
      re_password: data.confirmPassword,
      date_birth: data.birthDate,
      is_teacher: false,
      is_admin: false,
    };

    registerUser(payload, {
      onSuccess: () => {
        alert('Успешно зарегистрированы');
        reset();
      },
      onError: () => {
        alert('Ошибка регистрации');
      },
    });
  };

  return (
    <>
      <Header />

      <Container>
        <RegistrationContainer>
          <Typography variant="h5" align="center" color="#005343" gutterBottom>
            Регистрация
          </Typography>

          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField fullWidth label="ФИО" margin="normal" required {...register('fullName')} />
            <TextField fullWidth label="E-mail" margin="normal" required type="email" {...register('email')} />
            {/*<TextField*/}
            {/*  fullWidth*/}
            {/*  label="Дата рождения"*/}
            {/*  margin="normal"*/}
            {/*  required*/}
            {/*  type="date"*/}
            {/*  InputLabelProps={{ shrink: true }}*/}
            {/*  {...register('birthDate')}*/}
            {/*/>*/}
            <TextField fullWidth label="Пароль" margin="normal" required type="password" {...register('password')} />
            <TextField
              fullWidth
              label="Подтвердить пароль"
              margin="normal"
              required
              type="password"
              {...register('confirmPassword')}
            />

            <ContinueButton type="submit" fullWidth variant="contained" disabled={isPending}>
              {isPending ? 'Загрузка...' : 'Продолжить'}
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
