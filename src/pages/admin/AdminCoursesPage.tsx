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
import { useNavigate } from 'react-router-dom';
import { useAllEditableCourses } from '@/shared/api/queries/editCoursesApi.ts';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const AdminCoursesPage = () => {
  const { data, isLoading, isError } = useAllEditableCourses();
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">Управление курсами</Typography>
          <Button variant="contained" color="success" onClick={() => navigate('/create-courses')}>
            Создать курс
          </Button>
        </Box>

        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка загрузки курсов</Typography>}

        {data && (
          <Paper sx={{ mt: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Предмет</TableCell>
                  <TableCell>Месяц</TableCell>
                  <TableCell>Ученики</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.title}</TableCell>
                    <TableCell>{course.subject}</TableCell>
                    <TableCell>{course.month}</TableCell>
                    <TableCell>{course.students.length}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined" onClick={() => navigate(`/courses/edit/${course.id}`)}>
                        Подробнее
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </SidebarLayout>
  );
};
