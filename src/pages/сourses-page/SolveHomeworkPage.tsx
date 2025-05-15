import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useHomeworkToSolve, useSubmitHomework } from '@/shared/api/queries/solveHomeworkApi/api.ts';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout.tsx';

export const SolveHomeworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useHomeworkToSolve(homeworkId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fileAnswers, setFileAnswers] = useState<Record<number, File[]>>({});
  const submitMutation = useSubmitHomework(homeworkId);
  const navigate = useNavigate();

  const handleSelect = (number: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [number]: value,
    }));
  };

  const handleSubmit = () => {
    submitMutation.mutate(
      {
        textAnswers: answers,
        fileAnswers: fileAnswers,
      },
      {
        onSuccess: () => {
          navigate(`/homework/${homeworkId}/results`);
        },
        onError: () => alert('Ошибка при отправке ДЗ'),
      },
    );
  };

  return (
    <PageLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Домашнее задание
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data?.tasks.map((task) => {
            const isManual = !task.is_auto;

            return (
              <Box key={task.number} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  №{task.number} {task.question}
                </Typography>

                {isManual ? (
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      setFileAnswers((prev) => ({ ...prev, [task.number]: files }));
                    }}
                  />
                ) : (
                  <TextField
                    label="Ваш ответ"
                    fullWidth
                    value={answers[task.number] || ''}
                    onChange={(e) => handleSelect(task.number, e.target.value)}
                  />
                )}
              </Box>
            );
          })}

          <Box mt={3} textAlign="right">
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Завершить
            </Button>
          </Box>
        </Paper>
      </Container>
    </PageLayout>
  );
};
