import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSubmittedHomework } from '@/shared/api/queries/submitHomeworkApi/api.ts';

export const HomeworkResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const homeworkId = Number(id);
  const { data, isLoading, isError } = useSubmittedHomework(homeworkId);
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="md">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Результаты домашнего задания
          </Typography>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка загрузки</Typography>}

          {data && (
            <>
              <Table sx={{ my: 3 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>№ Вопроса</TableCell>
                    <TableCell>Ответ</TableCell>
                    <TableCell>Правильный ответ</TableCell>
                    <TableCell>Баллы</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.answers.map((a) => (
                    <TableRow key={a.number}>
                      <TableCell>{a.number}</TableCell>
                      <TableCell>{a.answers_text || '—'}</TableCell>
                      <TableCell>{a.correct_answer || 'Ожидает проверки'}</TableCell>
                      <TableCell>{a.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography fontWeight="bold" mb={2}>
                Итого: {data.total_score}
              </Typography>

              <Box textAlign="center">
                <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/my-courses')}>
                  На курс
                </Button>
                <Button variant="outlined" onClick={() => navigate(`/homework/${homeworkId}/submitted`)}>
                  Посмотреть задания
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
