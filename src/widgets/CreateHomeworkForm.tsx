import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useCreateHomework } from '@/shared/api/queries/createHomeworkApi.ts';
import { useTaskBank } from '@/shared/api/queries/taskBankApi.ts';
import { SubjectSelectRaw } from '@/shared/components/subject-select.tsx';

interface CreateHomeworkFormProps {
  lessonId: number;
  lessonTitle: string;
  onSuccess: () => void;
}

export const CreateHomeworkForm = ({ lessonId, lessonTitle, onSuccess }: CreateHomeworkFormProps) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: `Домашка по уроку: ${lessonTitle}`,
    },
  });

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    subject: '',
    exam_number: '',
    is_auto: '',
  });
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const queryParams = {
    page,
    pageSize,
    ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== '')),
  };

  const { data, isLoading, isFetching } = useTaskBank(queryParams);
  const { mutate: createHomework, isPending } = useCreateHomework();

  const handleAddTask = (id: number) => {
    if (!selectedTasks.includes(id)) {
      setSelectedTasks((prev) => [...prev, id]);
    }
  };

  const handleRemoveTask = (id: number) => {
    setSelectedTasks((prev) => prev.filter((taskId) => taskId !== id));
  };

  const handleResetFilters = () => {
    setFilters({ subject: '', exam_number: '', is_auto: '' });
    setPage(1);
  };

  useEffect(() => {
    setPage(1);
  }, [filters.subject, filters.exam_number, filters.is_auto]);

  const onSubmit = (form: any) => {
    createHomework(
      {
        lesson: lessonId,
        title: form.title,
        tasks: selectedTasks,
      },
      {
        onSuccess,
        onError: () => alert('Ошибка при создании ДЗ'),
      },
    );
  };

  return (
    <Paper sx={{ p: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField label="Название ДЗ" fullWidth {...register('title')} />

          {/* Фильтры */}
          <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
            <SubjectSelectRaw
              value={filters.subject}
              onChange={(e) => setFilters((prev) => ({ ...prev, subject: e.target.value }))}
            />
            <TextField
              label="Номер задания"
              type="number"
              value={filters.exam_number}
              onChange={(e) => setFilters((prev) => ({ ...prev, exam_number: e.target.value }))}
            />
            <Select
              displayEmpty
              value={filters.is_auto}
              onChange={(e) => setFilters((prev) => ({ ...prev, is_auto: e.target.value }))}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">Авто-проверка?</MenuItem>
              <MenuItem value="true">Да</MenuItem>
              <MenuItem value="false">Нет</MenuItem>
            </Select>
            <Button variant="outlined" onClick={handleResetFilters}>
              Сбросить фильтры
            </Button>
          </Box>

          {/* Выбранные задания */}
          {selectedTasks.length > 0 && (
            <Box>
              <Typography variant="h6">Выбранные задания:</Typography>
              <Stack spacing={1}>
                {selectedTasks.map((id) => (
                  <Box key={id} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography>Задание ID: {id}</Typography>
                    <IconButton onClick={() => handleRemoveTask(id)} size="small" color="error">
                      <Delete />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}

          {/* Список заданий */}
          <Typography variant="h6">Доступные задания:</Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={2}>
              {data?.results.map((task) => (
                <Card key={task.id} variant="outlined">
                  <CardContent>
                    <Typography fontWeight="bold">
                      {task.subject} • №{task.exam_number} • {task.ball} балл(ов)
                    </Typography>
                    <Typography gutterBottom>{task.question}</Typography>

                    <Chip
                      label={task.is_auto ? 'Авто' : 'Ручная проверка'}
                      size="small"
                      color={task.is_auto ? 'success' : 'warning'}
                    />

                    <Box mt={2}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleAddTask(task.id)}
                        disabled={selectedTasks.includes(task.id)}
                      >
                        {selectedTasks.includes(task.id) ? 'Добавлено' : 'Добавить'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {/* Пагинация */}
          {data?.count && (
            <Box textAlign="center">
              <Pagination
                page={page}
                count={Math.ceil(data.count / pageSize)}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
                disabled={isFetching}
              />
            </Box>
          )}

          {/* Отправка */}
          <Box textAlign="right">
            <Button type="submit" variant="contained" disabled={isPending || selectedTasks.length === 0}>
              {isPending ? 'Создание...' : 'Создать ДЗ'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};
