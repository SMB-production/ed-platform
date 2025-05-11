import { Box, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFieldArray, useForm } from 'react-hook-form';
import { useCreateCourse } from '@/shared/api/queries/create-course/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

type FormValues = {
  title: string;
  subject: string;
  month: string;
  content: string;
  teacher: number;
  students: { id: number }[];
  lessons: { id: number }[];
};

export const CreateCoursePage = () => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      students: [{ id: 0 }],
    },
  });

  const { mutate, isPending } = useCreateCourse();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'students',
  });

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        ...data,
        students: data.students.map((s) => s.id),
        lessons: [],
      },
      {
        onSuccess: () => {
          alert('Курс создан');
          reset();
        },
        onError: () => alert('Ошибка при создании курса'),
      },
    );
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Создать курс
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField fullWidth label="Название" margin="normal" {...register('title')} required />
            <TextField fullWidth label="Предмет" margin="normal" {...register('subject')} required />
            <TextField fullWidth label="Месяц" margin="normal" {...register('month')} />
            <TextField fullWidth label="Описание" margin="normal" {...register('content')} multiline rows={3} />
            <TextField
              fullWidth
              label="ID преподавателя"
              margin="normal"
              type="number"
              {...register('teacher', { valueAsNumber: true })}
              required
            />

            <Box mt={3}>
              <Typography variant="h6">Список учеников</Typography>
              {fields.map((field, index) => (
                <Stack direction="row" spacing={2} alignItems="center" key={field.id} mt={1}>
                  <TextField
                    label={`ID ученика #${index + 1}`}
                    type="number"
                    {...register(`students.${index}.id`, { valueAsNumber: true })}
                  />
                  <Button variant="text" color="error" onClick={() => remove(index)}>
                    Удалить
                  </Button>
                </Stack>
              ))}
              <IconButton onClick={() => append({ id: 0 })}>
                <AddIcon />
              </IconButton>
            </Box>

            <Box mt={4} textAlign="right">
              <Button type="submit" variant="contained" color="success" disabled={isPending}>
                {isPending ? 'Создание...' : 'Создать курс'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
