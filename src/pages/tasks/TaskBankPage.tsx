import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTaskBank } from '@/shared/api/queries/taskBankApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';
import { useNavigate } from 'react-router-dom';

export const TaskBankPage = () => {
  const { data, isLoading, isError } = useTaskBank();
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="xl">
        <Paper sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">Банк заданий</Typography>
            <Button variant="contained" color="success" onClick={() => navigate('/create-task')}>
              Создать задание
            </Button>
          </Box>

          {isLoading && <Typography>Загрузка...</Typography>}
          {isError && <Typography color="error">Ошибка при загрузке</Typography>}

          {data && (
            <Table>
              <TableHead sx={{ backgroundColor: '#e9ecef' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Вопрос</TableCell>
                  <TableCell>Ответ</TableCell>
                  <TableCell>Предмет</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Авто?</TableCell>
                  <TableCell>Балл</TableCell>
                  <TableCell>Подробнее</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.question}</TableCell>
                    <TableCell>{task.correct_answer}</TableCell>
                    <TableCell>{task.subject}</TableCell>
                    <TableCell>{task.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={task.is_auto ? 'Да' : 'Нет'}
                        color={task.is_auto ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{task.ball}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => navigate(`/task/${task.id}`)}>
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Container>
    </SidebarLayout>
  );
};
