import { Box, Button, Container, Paper, Stack, TextField, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Header } from '@/widgets/header';
import { useForm } from 'react-hook-form';
import { RegisterDto } from '@/shared/api/queries/auth/model.ts';
import { useRegister } from '@/shared/api/queries/auth/authApi.ts';
import { useNavigate } from 'react-router-dom';

const FormCard = styled(Paper)(({ theme }) => ({
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
  const navigate = useNavigate();
  const theme = useTheme();

  const onSubmit = (data: FormValues) => {
    const payload: RegisterDto = {
      username: data.fullName,
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
        navigate('/login');
      },
      onError: () => {
        alert('Ошибка регистрации');
      },
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" align="center" fontWeight={600} color="primary" gutterBottom>
          Регистрация
        </Typography>

        <FormCard>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <TextField fullWidth label="ФИО" required {...register('fullName')} />
              <TextField fullWidth label="E-mail" required type="email" {...register('email')} />
              <TextField
                fullWidth
                label="Дата рождения"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register('birthDate')}
              />
              <TextField fullWidth label="Пароль" required type="password" {...register('password')} />
              <TextField
                fullWidth
                label="Подтвердить пароль"
                required
                type="password"
                {...register('confirmPassword')}
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
                {isPending ? 'Загрузка...' : 'Продолжить'}
              </Button>

              <Button
                onClick={() => navigate('/login')}
                variant="text"
                fullWidth
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                }}
              >
                Уже есть аккаунт? Войти
              </Button>
            </Stack>
          </Box>
        </FormCard>
      </Container>
    </>
  );
};
