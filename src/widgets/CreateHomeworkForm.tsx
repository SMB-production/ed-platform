import { Box, Button, Paper, Stack, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTaskBank } from '@/shared/api/queries/taskBankApi.ts';
import { useCreateHomework } from '@/shared/api/queries/createHomeworkApi.ts';

type FormValues = {
  title: string;
  selectedTaskIds: number[];
};

export const CreateHomeworkForm = ({
  lessonId,
  lessonTitle,
  onSuccess,
}: {
  lessonId: number;
  lessonTitle: string;
  onSuccess?: (newHomeworkId: number) => void;
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      selectedTaskIds: [],
      title: `Домашняя работа для ${lessonTitle}`,
    },
  });

  const { data: taskList, isLoading } = useTaskBank();
  const { mutate: createHomework } = useCreateHomework();
  const navigate = useNavigate();

  const selectedTasks = watch('selectedTaskIds');

  const onToggleTask = (id: number) => {
    const updated = selectedTasks.includes(id) ? selectedTasks.filter((tid) => tid !== id) : [...selectedTasks, id];
    setValue('selectedTaskIds', updated);
  };

  const onSubmit = (data: FormValues) => {
    createHomework(
      {
        title: data.title,
        lesson: lessonId,
        tasks: data.selectedTaskIds,
      },
      {
        onSuccess: (res) => {
          alert('Домашняя работа создана');
          if (onSuccess) onSuccess(res.id);
          navigate(`/lesson/manage/${lessonId}`);
        },
        onError: () => {
          alert('Ошибка при создании');
        },
      },
    );
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Создать домашнюю работу
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField fullWidth label="Название" required {...register('title')} />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Задания:
            </Typography>
            {isLoading ? (
              <Typography>Загрузка задач...</Typography>
            ) : (
              taskList?.map((task) => (
                <FormControlLabel
                  key={task.id}
                  control={
                    <Checkbox checked={selectedTasks.includes(task.id)} onChange={() => onToggleTask(task.id)} />
                  }
                  label={`#${task.id} — ${task.question}`}
                />
              ))
            )}
          </Box>

          <Button variant="contained" color="success" type="submit">
            Создать
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
