import { Box, Button, Chip, Container, Link, Paper, Stack, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useLessonById } from '@/shared/api/queries/lessons/api';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { usePatchLesson } from '@/shared/api/queries/editLessonApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { CreateHomeworkForm } from '@/widgets/CreateHomeworkForm.tsx';
import { useDeleteHomework } from '@/shared/api/queries/deleteHomeworkApi.ts';
import { getFileLink } from '@/shared/get-file-link.ts';

export const LessonManagePage = () => {
  const { id } = useParams<{ id: string }>();
  const lessonId = Number(id);

  const { data: lesson, isLoading, isError, refetch } = useLessonById(lessonId);
  const { mutate: patchLesson, isPending: isSaving } = usePatchLesson(lessonId);
  const navigate = useNavigate();

  const homeworkId = lesson?.homework;
  const { mutate: deleteHomework, isPending: isDeleting } = useDeleteHomework(homeworkId ?? 0);

  const { register, handleSubmit } = useForm({
    values: {
      title: lesson?.title || '',
      lesson_date: lesson?.lesson_date?.slice(0, 10) || '',
    },
  });

  const onSubmit = (data: any) => {
    patchLesson(data, {
      onSuccess: () => {
        alert('Урок обновлён');
        refetch();
      },
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError || !lesson ? (
            <Typography color="error">Ошибка загрузки урока</Typography>
          ) : (
            <>
              <Typography variant="h4" gutterBottom>
                {lesson.title}
              </Typography>

              {/* Редактируемая форма */}
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <TextField label="Название" fullWidth {...register('title')} />
                  <TextField label="Описание" fullWidth multiline rows={8} {...register('content')} />
                  <TextField label="Ссылка на запись" fullWidth {...register('video_link')} />
                  <TextField
                    label="Дата урока"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    {...register('lesson_date')}
                  />
                  <Box textAlign="right">
                    <Button type="submit" variant="contained" color="success" disabled={isSaving}>
                      {isSaving ? 'Сохраняем...' : 'Применить'}
                    </Button>
                  </Box>
                </Stack>
              </Box>

              {/* Файлы */}
              {lesson.files?.length > 0 && (
                <Box mt={4}>
                  <Typography fontWeight={600}>Файлы:</Typography>
                  <Stack>
                    {lesson.files.map((f, idx) => (
                      <Link key={idx} href={f.file} target="_blank" rel="noopener">
                        {f.file.split('/').pop()}
                      </Link>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Домашняя работа */}
              <Box mt={5}>
                <Typography variant="h6" gutterBottom>
                  Домашнее задание
                </Typography>

                {lesson.homework ? (
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                      label={`ID ДЗ: ${lesson.homework}`}
                      onClick={() => navigate(`/homework/${lesson.homework}/submitted`)}
                      clickable
                    />
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      disabled={isDeleting}
                      onClick={() => {
                        if (confirm('Вы уверены, что хотите удалить домашнее задание?')) {
                          deleteHomework(undefined, {
                            onSuccess: () => {
                              patchLesson(
                                { homework: null },
                                {
                                  onSuccess: () => {
                                    alert('Домашняя работа удалена');
                                    refetch();
                                  },
                                },
                              );
                            },
                            onError: () => alert('Ошибка при удалении'),
                          });
                        }
                      }}
                    >
                      {isDeleting ? 'Удаление...' : 'Удалить ДЗ'}
                    </Button>
                  </Box>
                ) : (
                  <Box mt={2}>
                    <CreateHomeworkForm
                      lessonId={lessonId}
                      lessonTitle={lesson.title}
                      onSuccess={() => {
                        alert('ДЗ создано и прикреплено');
                        refetch();
                      }}
                    />
                  </Box>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
