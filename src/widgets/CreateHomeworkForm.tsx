import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useForm, useFieldArray } from 'react-hook-form';
import { Add, Delete } from '@mui/icons-material';
import { useCreateHomework } from '@/shared/api/queries/createHomeworkApi.ts';

interface CreateHomeworkFormProps {
  lessonId: number;
  lessonTitle: string;
  onSuccess: () => void;
}

export const CreateHomeworkForm = ({ lessonId, lessonTitle, onSuccess }: CreateHomeworkFormProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: `Домашка по уроку: ${lessonTitle}`,
      tasks: [{ question: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  });

  const { mutate: createHomework, isPending } = useCreateHomework();

  const onSubmit = (data: any) => {
    console.log(data.tasks);
    const taskIds = data.tasks.map((task: { question: string }) => Number(task.question));
    console.log(taskIds);

    const payload = {
      lesson: lessonId,
      title: data.title,
      tasks: taskIds,
    };

    createHomework(payload, {
      onSuccess,
      onError: () => alert('Ошибка при создании ДЗ'),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="Название ДЗ" fullWidth {...control.register('title')} />

        <Typography fontWeight="bold">Задания</Typography>
        {fields.map((field, index) => (
          <Box key={field.id} display="flex" alignItems="center" gap={1}>
            <TextField fullWidth label={`ID задания № ${index + 1}`} {...control.register(`tasks.${index}.question`)} />
            <IconButton onClick={() => remove(index)} color="error">
              <Delete />
            </IconButton>
          </Box>
        ))}

        <Button startIcon={<Add />} onClick={() => append({ question: '' })} variant="outlined">
          Добавить задание
        </Button>

        <Box textAlign="right">
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Создание...' : 'Создать ДЗ'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
