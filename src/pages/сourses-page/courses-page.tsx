import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCourses } from '@/shared/api/queries/courses';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout';

export const CoursesPage = () => {
  const { data, isLoading, isError } = useCourses();
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Typography variant="h4" gutterBottom>
        Курсы
      </Typography>

      {isLoading && <Typography>Загрузка...</Typography>}
      {isError && <Typography color="error">Ошибка загрузки курсов</Typography>}

      {data && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#e9ecef' }}>
              <TableRow>
                <TableCell>Название курса</TableCell>
                <TableCell>Предмет</TableCell>
                <TableCell>Месяц</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.results.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.subject}</TableCell>
                  <TableCell>{course.month}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" onClick={() => navigate(`/courses/${course.id}`)}>
                      Просмотр
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </SidebarLayout>
  );
};
