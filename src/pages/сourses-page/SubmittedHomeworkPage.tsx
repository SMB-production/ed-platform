import { Box, Container, Link, Paper, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSubmittedHomeworkById } from '@/shared/api/queries/submitHomeworkApi/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const SubmittedHomeworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useSubmittedHomeworkById(homeworkId);

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Отправленная домашняя работа
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка при загрузке</Typography>}

          {data && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Сдано: {new Date(data.created_at).toLocaleString()}
              </Typography>
              <Typography gutterBottom>
                Итоговый балл: <strong>{data.result}</strong>
              </Typography>
              {data.comment && (
                <Typography gutterBottom>
                  Комментарий: <em>{data.comment}</em>
                </Typography>
              )}

              <Box mt={3}>
                <Typography variant="h6" gutterBottom>
                  Ответы:
                </Typography>
                <Stack spacing={2}>
                  {data.answers?.map((a) => {
                    const correct = a.answers_text === a.correct_answer;
                    return (
                      <Paper
                        key={a.number}
                        sx={{
                          p: 2,
                          borderLeft: '6px solid',
                          borderColor: correct ? 'success.main' : 'error.main',
                          backgroundColor: correct ? '#e8f5e9' : '#ffebee',
                        }}
                      >
                        <Typography fontWeight={600}>
                          №{a.number}: {a.question}
                        </Typography>
                        <Typography>
                          Ваш ответ: <strong>{a.answers_text || '—'}</strong>
                        </Typography>
                        <Typography>Правильный ответ: {a.correct_answer || '—'}</Typography>
                        <Typography>Балл: {a.result}</Typography>

                        {a.files && a.files.length > 0 && (
                          <Box mt={1}>
                            <Typography variant="body2">Файлы:</Typography>
                            {a.files.map((f, i) => (
                              <Link key={i} href={f.file} target="_blank" rel="noopener" display="block">
                                {f.file.split('/').pop()}
                              </Link>
                            ))}
                          </Box>
                        )}
                      </Paper>
                    );
                  })}
                </Stack>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
