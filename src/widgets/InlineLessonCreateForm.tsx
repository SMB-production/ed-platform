import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useCreateLesson } from '@/shared/api/queries/create-lesson/api';
import { CreateLessonDto } from '@/shared/api/queries/create-lesson/model';

export const InlineLessonCreateForm = ({ courseId, onSuccess }: { courseId: number; onSuccess: () => void }) => {
  const { register, handleSubmit, control, reset } = useForm<CreateLessonDto>();
  const { mutate, isPending } = useCreateLesson();

  const onSubmit = (data: CreateLessonDto) => {
    mutate(data, {
      onSuccess: () => {
        alert('Урок создан');
        reset();
        onSuccess();
      },
      onError: () => {
        alert('Ошибка при создании урока');
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }} noValidate>
      <Stack spacing={2}>
        <Typography variant="subtitle1">Новый урок</Typography>
        <TextField label="Название" fullWidth required {...register('title')} />
        <TextField
          label="ID домашнего задания (необязательно)"
          type="number"
          fullWidth
          {...register('homework', { valueAsNumber: true })}
        />
        <Controller
          name="files"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              multiple
              onChange={(e) => field.onChange(e.target.files ? Array.from(e.target.files) : [])}
            />
          )}
        />
        <input type="hidden" value={courseId} {...register('course')} />

        <Box textAlign="right">
          <Button type="submit" variant="contained" color="success" disabled={isPending}>
            {isPending ? 'Создание...' : 'Создать урок'}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
