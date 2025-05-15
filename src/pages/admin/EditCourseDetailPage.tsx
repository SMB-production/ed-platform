import { Box, Button, Chip, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useEditCourseById, usePutCourse } from '@/shared/api/queries/editCoursesApi.ts';
import { useDeleteCourse } from '@/shared/api/queries/courses/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { InlineLessonCreateForm } from '@/widgets/InlineLessonCreateForm.tsx';
import { SubjectSelect } from '@/shared/components/subject-select.tsx';
import { MonthSelect } from '@/shared/components/months-select.tsx';

type FormValues = {
  title: string;
  subject: string;
  month: string;
  content: string;
  teacher: number;
  students: string; // comma-separated IDs
};

export const EditCourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const { data, isLoading, isError, refetch } = useEditCourseById(courseId);
  const { mutate: updateCourse } = usePutCourse(courseId);
  const { mutate: deleteCourse } = useDeleteCourse(courseId);
  const navigate = useNavigate();
  const [showLessonForm, setShowLessonForm] = useState(false);

  const { register, handleSubmit, control } = useForm<FormValues>();

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (isError || !data) return <Typography>Ошибка загрузки курса</Typography>;

  const onSubmit = (form: FormValues) => {
    const studentIds = form.students
      .split(',')
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));

    updateCourse(
      {
        title: form.title,
        subject: form.subject,
        month: form.month,
        content: form.content,
        teacher: Number(form.teacher),
        students: studentIds,
        lessons: data.lessons,
      },
      {
        onSuccess: () => {
          alert('Курс обновлён');
        },
      },
    );
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Редактирование курса #{courseId}
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <Stack spacing={2}>
              <TextField label="Название курса" defaultValue={data.title} fullWidth {...register('title')} />
              <SubjectSelect control={control} name={'subject'} defaultValue={data.subject} />
              <MonthSelect control={control} name={'month'} defaultValue={data.month} />
              <TextField
                label="Описание"
                defaultValue={data.content}
                fullWidth
                multiline
                rows={8}
                {...register('content')}
              />
              <TextField
                label="ID преподавателя"
                type="number"
                defaultValue={data.teacher}
                fullWidth
                {...register('teacher', { valueAsNumber: true })}
              />
              <TextField
                label="ID учеников (через запятую)"
                fullWidth
                defaultValue={data.students?.join(', ')}
                {...register('students')}
              />

              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" type="submit">
                  Сохранить изменения
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    if (confirm('Удалить курс?')) {
                      deleteCourse(undefined, {
                        onSuccess: () => {
                          alert('Курс удалён');
                          navigate('/courses/admin');
                        },
                      });
                    }
                  }}
                >
                  Удалить курс
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box mt={5}>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1">Уроки курса</Typography>
              <IconButton size="small" onClick={() => setShowLessonForm((prev) => !prev)}>
                <AddIcon sx={{ color: '#005343' }} />
              </IconButton>
            </Box>

            {showLessonForm && (
              <InlineLessonCreateForm
                courseId={courseId}
                onSuccess={() => {
                  setShowLessonForm(false);
                  refetch();
                }}
              />
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap" mt={2}>
              {data.lessons.length > 0 ? (
                data.lessons.map((lessonId) => (
                  <Chip
                    key={lessonId}
                    label={`Урок #${lessonId}`}
                    onClick={() => navigate(`/lesson/manage/${lessonId}`)}
                    clickable
                  />
                ))
              ) : (
                <Typography>Уроков пока нет</Typography>
              )}
            </Stack>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
