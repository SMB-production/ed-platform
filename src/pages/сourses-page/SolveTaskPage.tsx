import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useHomeworkById } from '@/shared/api/queries/homeworkApi/api.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

const TaskNumberBox = styled(Box)<{ correct?: boolean; incorrect?: boolean }>(({ correct, incorrect }) => ({
  width: 48,
  height: 48,
  borderRadius: 8,
  fontSize: 20,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '24px auto',
  color: '#fff',
  backgroundColor: correct ? '#28a745' : incorrect ? '#c62828' : '#e0e0e0',
}));

const AnswerText = styled(Typography)<{ correct?: boolean }>(({ correct }) => ({
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 500,
  color: correct ? '#28a745' : '#c62828',
}));

export const SolveTaskPage = () => {
  const { homeworkId, taskNumber } = useParams<{ homeworkId: string; taskNumber: string }>();
  const { data, isLoading, isError } = useHomeworkById(Number(homeworkId));
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);

  const task = data?.tasks.find((t) => t.number === Number(taskNumber));
  const isCorrect = userAnswer.trim() === task?.correct_answer;

  const handleCheck = () => setShowResult(true);

  return (
    <SidebarLayout>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка при загрузке задания</Typography>}
          {task && (
            <>
              <Typography variant="h6" gutterBottom>
                Домашнее задание: {data?.title}
              </Typography>

              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                №{task.number}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {task.question}
              </Typography>

              {task.files?.length > 0 && (
                <>
                  <Typography variant="subtitle2">Файлы:</Typography>
                  <List>
                    {task.files.map((f, idx) => (
                      <ListItem key={idx}>
                        <ListItemText
                          primary={
                            <Link href={f.file} target="_blank" rel="noopener">
                              {f.file.split('/').pop()}
                            </Link>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {!showResult && (
                <>
                  <TextField
                    fullWidth
                    placeholder="Введите ответ"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    sx={{ my: 3 }}
                  />
                  <Box textAlign="center">
                    <Button variant="contained" onClick={handleCheck}>
                      Ответить
                    </Button>
                  </Box>
                </>
              )}

              {showResult && (
                <>
                  <TaskNumberBox correct={isCorrect} incorrect={!isCorrect}>
                    {userAnswer}
                  </TaskNumberBox>
                  <AnswerText correct={isCorrect}>
                    {isCorrect
                      ? 'Правильно! Вы ответили верно.'
                      : `Неправильно. Правильный ответ: ${task.correct_answer}`}
                  </AnswerText>
                </>
              )}
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
