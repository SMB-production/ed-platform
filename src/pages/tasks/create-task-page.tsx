import { Box, Button, Container, Paper, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useCreateTask } from '@/shared/api/queries/tasks/api.ts';
import { SubjectSelect } from '@/shared/components/subject-select.tsx';

type FormValues = {
  question: string;
  correct_answer: string;
  subject: string;
  ball: number;
  exam_number: number;
  is_auto: boolean;
  files: File[];
};

export const CreateTaskPage = () => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>();
  const { mutate, isPending } = useCreateTask();

  const onSubmit = (data: FormValues) => {
    mutate(data, {
      onSuccess: () => {
        alert('Задание создано');
        reset();
      },
      onError: () => alert('Ошибка при создании задания'),
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Создать задание
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField label="Условие задания" multiline rows={8} fullWidth margin="normal" {...register('question')} />

            <TextField label="Ответ" fullWidth margin="normal" {...register('correct_answer')} />
            <SubjectSelect control={control} name={'subject'} />

            <TextField
              label="Балл"
              type="number"
              fullWidth
              margin="normal"
              {...register('ball', { valueAsNumber: true })}
            />

            <TextField
              label="Номер задания"
              type="number"
              fullWidth
              margin="normal"
              {...register('exam_number', { valueAsNumber: true })}
            />

            <FormControlLabel
              control={
                <Controller
                  name="is_auto"
                  control={control}
                  defaultValue={true}
                  render={({ field }) => <Checkbox {...field} checked={field.value} />}
                />
              }
              label="Проверяется автоматически"
            />

            <Controller
              name="files"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <input
                  type="file"
                  multiple
                  onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
                />
              )}
            />

            <Box mt={3} textAlign="right">
              <Button type="submit" variant="contained" color="success" disabled={isPending}>
                {isPending ? 'Создание...' : 'Создать задание'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
