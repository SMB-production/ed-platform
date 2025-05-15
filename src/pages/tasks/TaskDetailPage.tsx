import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { Controller, useForm } from 'react-hook-form';
import { useDeleteTask, usePatchTask, useTaskById } from '@/shared/api/queries/taskBankApi';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { getFileLink } from '@/shared/get-file-link.ts';

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const taskId = Number(id);
  const { data, isLoading, isError } = useTaskById(taskId);
  const { mutate: updateTask } = usePatchTask(taskId);
  const { mutate: deleteTask } = useDeleteTask(taskId);
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm<{
    question: string;
    correct_answer: string;
    ball: number;
    is_auto: boolean;
    files: FileList;
  }>();

  const onSubmit = (form: {
    question: string;
    correct_answer: string;
    ball: number;
    is_auto: boolean;
    files: FileList;
  }) => {
    updateTask(
      {
        question: form.question,
        correct_answer: form.correct_answer,
        ball: form.ball,
        is_auto: form.is_auto,
        files: form.files ? Array.from(form.files) : [],
      },
      {
        onSuccess: () => alert('Задание обновлено'),
      },
    );
  };

  return (
    <SidebarLayout>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Редактирование задания #{taskId}
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError || !data ? (
            <Typography color="error">Ошибка загрузки</Typography>
          ) : (
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate mt={3}>
              <Stack spacing={2}>
                <TextField label="Вопрос" fullWidth defaultValue={data.question} {...register('question')} />
                <TextField
                  label="Правильный ответ"
                  fullWidth
                  defaultValue={data.correct_answer}
                  {...register('correct_answer')}
                />
                <TextField
                  label="Балл"
                  type="number"
                  fullWidth
                  defaultValue={data.ball}
                  {...register('ball', { valueAsNumber: true })}
                />

                <FormControlLabel
                  control={
                    <Controller
                      name="is_auto"
                      control={control}
                      defaultValue={data.is_auto}
                      render={({ field }) => <Checkbox {...field} checked={field.value} />}
                    />
                  }
                  label="Проверка автоматическая"
                />

                <Box>
                  <Typography fontSize={14} mb={1}>
                    Файлы:
                  </Typography>
                  {data.files.map((f, i) => (
                    <Link key={i} href={getFileLink(f.file)} target="_blank" rel="noopener" display="block">
                      {f.file.split('/').pop()}
                    </Link>
                  ))}
                </Box>

                <input type="file" multiple {...register('files')} />

                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" color="success">
                    Сохранить
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (confirm('Удалить задание?')) {
                        deleteTask(undefined, {
                          onSuccess: () => {
                            alert('Удалено');
                            navigate('/task-bank');
                          },
                        });
                      }
                    }}
                  >
                    Удалить
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
