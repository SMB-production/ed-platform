import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserCourses } from '@/shared/api/queries/userCoursesApi/api.ts';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout.tsx';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';

export const MyCoursesPage = () => {
  const { data, isLoading, isError } = useUserCourses();
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Ваше обучение
        </Typography>

        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка при загрузке курсов</Typography>}

        <Grid container spacing={2} mt={1}>
          {data?.results.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <ButtonBase
                onClick={() => navigate(`/courses/${course.id}`)}
                sx={{
                  width: '100%',
                  height: 150,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  padding: 2,
                  flexDirection: 'column',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,83,67,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,83,67,0.15)',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.subject}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{
                    width: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {course.month}
                </Typography>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SidebarLayout>
  );
};
