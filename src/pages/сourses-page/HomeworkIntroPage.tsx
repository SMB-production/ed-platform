import { Box, Button, Container, Paper, Stack, Typography, Chip, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout';
import { useHomeworkToSolve } from '@/shared/api/queries/solveHomeworkApi/api.ts';

export const HomeworkIntroPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useHomeworkToSolve(homeworkId);
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки домашнего задания</Typography>}

          {data && (
            <>
              <Typography variant="h4" gutterBottom>
                {data.title}
              </Typography>

              <Box mt={3}>
                <Typography variant="h6">Задания</Typography>
                <Stack spacing={2} mt={1}>
                  {data.tasks.map((task) => (
                    <Paper key={task.number} sx={{ p: 2, borderLeft: '5px solid #005343' }}>
                      <Typography fontWeight={600}>
                        №{task.number}: {task.question}
                      </Typography>

                      {task.is_auto ? (
                        <Chip label="Автоматическая проверка" size="small" sx={{ mt: 1 }} />
                      ) : (
                        <Chip label="Ручная проверка" color="warning" size="small" sx={{ mt: 1 }} />
                      )}

                      {task.files?.length > 0 && (
                        <Box mt={1}>
                          <Typography variant="body2">Материалы:</Typography>
                          {task.files.map((f, i) => (
                            <Link key={i} href={f.file} target="_blank" rel="noopener" display="block">
                              {f.file.split('/').pop()}
                            </Link>
                          ))}
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Box mt={4} textAlign="right">
                {data.is_done ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/homework/${homeworkId}/results`)}
                  >
                    Посмотреть результат
                  </Button>
                ) : (
                  <Button variant="contained" color="success" onClick={() => navigate(`/homework/${homeworkId}/solve`)}>
                    Решить домашнее задание
                  </Button>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </PageLayout>
  );
};
