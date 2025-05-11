import { useRateUserHomework, useUserHomeworkById } from '@/shared/api/queries/homeworkApi/api';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useState } from 'react';

export const UserHomeworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useUserHomeworkById(Number(id));

  const total = data?.answers.length ?? 0;
  const score = data?.answers.reduce((sum, a) => sum + a.result, 0) ?? 0;

  const [scores, setScores] = useState<Record<number, number>>({});
  const [comment, setComment] = useState(data?.comment ?? '');
  const rateMutation = useRateUserHomework(Number(id));

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data && (
            <>
              <Typography variant="h4" gutterBottom>
                Домашнее задание #{data.id}
              </Typography>

              <Typography>
                <strong>ФИ:</strong> {data.user.firstname} {data.user.lastname}
              </Typography>

              <Box mt={3}>
                {data.answers.map((ans) => {
                  const isCorrect = ans.answers_text === ans.correct_answer;
                  const isManual = !ans.is_auto;

                  return (
                    <Box
                      key={ans.number}
                      sx={{
                        border: '1px solid',
                        borderColor: isCorrect ? 'success.main' : 'error.main',
                        borderRadius: 2,
                        p: 2,
                        mb: 2,
                      }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        №{ans.number} Задание:
                      </Typography>
                      <Typography gutterBottom>{ans.question}</Typography>
                      <TextField
                        label="Ответ ученика"
                        fullWidth
                        value={ans.answers_text}
                        InputProps={{ readOnly: true }}
                        sx={{ mb: 1 }}
                      />
                      <Typography color={isCorrect ? 'success.main' : 'error.main'}>
                        Правильный ответ: {ans.correct_answer}
                      </Typography>

                      {isManual && (
                        <TextField
                          label="Балл (ручная проверка)"
                          type="number"
                          fullWidth
                          margin="dense"
                          value={scores[ans.number] ?? ans.result}
                          onChange={(e) =>
                            setScores((prev) => ({
                              ...prev,
                              [ans.number]: Number(e.target.value),
                            }))
                          }
                        />
                      )}
                    </Box>
                  );
                })}
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Комментарий
                </Typography>
                <TextField fullWidth multiline rows={3} value={comment} onChange={(e) => setComment(e.target.value)} />
              </Box>

              <Box mt={3} textAlign="right">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() =>
                    rateMutation.mutate(
                      { comment, scores },
                      {
                        onSuccess: () => {
                          alert('Оценка сохранена');
                        },
                      },
                    )
                  }
                >
                  Сохранить
                </Button>
              </Box>

              <Typography sx={{ mt: 3 }} fontWeight="bold">
                Итоговый балл: {score}/{total}
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
