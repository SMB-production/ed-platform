import { Container, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { InlineLessonCreateForm } from '@/widgets/InlineLessonCreateForm';

export const CreateLessonPage = () => {
  const { register, watch } = useForm<{ courseId: number }>();
  const courseId = watch('courseId');
  const [submitted, setSubmitted] = useState(false);

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Создание урока
          </Typography>

          <TextField
            fullWidth
            label="ID курса"
            type="number"
            {...register('courseId', { valueAsNumber: true })}
            sx={{ mb: 3 }}
          />

          {courseId ? (
            <InlineLessonCreateForm
              courseId={courseId}
              onSuccess={() => {
                setSubmitted(true);
              }}
            />
          ) : (
            <Typography color="text.secondary">Введите ID курса, к которому привязать урок</Typography>
          )}

          {submitted && (
            <Typography color="success.main" mt={2}>
              Урок успешно создан!
            </Typography>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
