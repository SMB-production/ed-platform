import { ButtonBase, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { SidebarLayout } from '@/shared/components/PageLayout/SidebarLayout.tsx';
import { useCourseById } from '@/shared/api/queries/courses';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout.tsx';

export const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = Number(id);
  const { data, isLoading, isError } = useCourseById(courseId);
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
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
                      backgroundColor: 'rgba(0,83,67,0.1)',
                      '&:hover': {
                        backgroundColor: 'rgba(0,83,67,0.15)',
                      },
                    }}
                    onClick={() => navigate(`/lessons/${lesson.id}`)}
                  >
                    <Typography
                      variant="h4"
                      align="center"
                      sx={{
                        width: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {lesson.title}
                    </Typography>
                  </ButtonBase>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </PageLayout>
  );
};
