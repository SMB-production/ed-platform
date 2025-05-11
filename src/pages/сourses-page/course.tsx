import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useCourseById } from '@/shared/api/queries/courses';

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const { data, isLoading, isError } = useCourseById(courseId);
  const navigate = useNavigate();

  return (
    <SidebarLayout>
      <Container maxWidth="lg">
        {isLoading && <Typography>Загрузка...</Typography>}
        {isError && <Typography color="error">Ошибка при загрузке курса</Typography>}

        {data && (
          <>
            <Typography variant="h4" gutterBottom>
              {data.title} ({data.subject})
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Месяц: {data.month}
            </Typography>
            <Typography variant="body1" paragraph>
              {data.content}
            </Typography>

            <Grid container spacing={2} mt={3}>
              {data.lessons.map((lesson) => (
                <Grid item xs={12} sm={6} md={4} key={lesson.id}>
                  <ButtonBase
                    sx={{
                      width: '100%',
                      height: 150,
                      borderRadius: 2,
                      border: '1px solid #ccc',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      display: 'flex',
                      p: 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                  >
                    <Typography variant="h6" align="center">
                      {lesson.title}
                    </Typography>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </SidebarLayout>
  );
};
