import { Box, Button, Container, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useHomeworkToSolve, useSubmitHomework } from '@/shared/api/queries/solveHomeworkApi/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const SolveHomeworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useHomeworkToSolve(homeworkId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const submitMutation = useSubmitHomework(homeworkId);

  const handleSelect = (number: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [number]: value,
    }));
  };

  const handleSubmit = () => {
    submitMutation.mutate(answers, {
      onSuccess: () => alert('ДЗ отправлено!'),
      onError: () => alert('Ошибка при отправке ДЗ'),
    });
  };

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Домашнее задание
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data?.tasks.map((task) => (
            <Box key={task.number} sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                №{task.number} {task.question}
              </Typography>

              <RadioGroup
                value={answers[task.number] || ''}
                onChange={(e) => handleSelect(task.number, e.target.value)}
              >
                {[1, 2, 3, 4].map((opt) => (
                  <FormControlLabel key={opt} value={String(opt)} control={<Radio />} label={String(opt)} />
                ))}
              </RadioGroup>
            </Box>
          ))}

          <Box mt={3} textAlign="right">
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Завершить
            </Button>
          </Box>
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
