import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCurrentUser } from '@/shared/api/queries/auth/authApi.ts';
import { useUpdateProfile } from '@/shared/api/queries/updateProfileApi/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

type FormValues = {
  username: string;
  email: string;
  date_birth: string;
  photo: FileList;
};

export const EditProfilePage = () => {
  const { data: user } = useCurrentUser();
  const { register, handleSubmit, setValue, control } = useForm<FormValues>();
  const { mutate, isPending } = useUpdateProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('date_birth', user.date_birth ?? '');
    }
  }, [user]);

  const onSubmit = (form: FormValues) => {
    mutate(
      {
        username: form.username,
        email: form.email,
        date_birth: form.date_birth,
        photo: form.photo?.[0] ?? undefined,
      },
      {
        onSuccess: () => {
          alert('Профиль обновлён');
          navigate('/profile');
        },
        onError: () => {
          alert('Ошибка при обновлении профиля');
        },
      },
    );
  };

  return (
    <SidebarLayout>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Редактирование профиля
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField label="ФИО" fullWidth margin="normal" {...register('username')} />
            <TextField label="Email" fullWidth margin="normal" {...register('email')} />
            <TextField
              label="Дата рождения"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('date_birth')}
            />
            <Controller
              name="photo"
              control={control}
              render={({ field }) => (
                <input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files ?? [])} />
              )}
            />
            <Box mt={3} textAlign="right">
              <Button type="submit" variant="contained" disabled={isPending}>
                Сохранить
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
