import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { usePutHomework } from '@/shared/api/queries/editHomeworkApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

type FormValues = {
  title: string;
  lesson: number;
  tasks: string;
};

export const HomeworkEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { register, handleSubmit } = useForm<FormValues>();
  const { mutate, isPending } = usePutHomework(homeworkId);
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const ids = data.tasks
      .split(',')
      .map((t) => parseInt(t.trim()))
      .filter((n) => !isNaN(n));

    mutate(
      {
        title: data.title,
        lesson: Number(data.lesson),
        tasks: ids,
      },
      {
        onSuccess: () => {
          alert('Домашнее задание обновлено');
          navigate('/homework/all');
        },
      },
    );
  };

  return (
    <SidebarLayout>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Редактирование домашнего задания #{homeworkId}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField label="Название" fullWidth margin="normal" {...register('title', { required: true })} />

            <TextField
              label="ID урока"
              type="number"
              fullWidth
              margin="normal"
              {...register('lesson', { valueAsNumber: true })}
            />

            <TextField
              label="Список ID заданий (через запятую)"
              fullWidth
              margin="normal"
              {...register('tasks')}
              helperText="Например: 5,6,7"
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
