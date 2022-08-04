import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import styles from '@styles/home.module.scss';
import variables from '@styles/vars.module.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Universidad Mariano Galvez
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let id = JSON.stringify({id: 1, name: 'John Doe'});

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <main>
        <Box sx={{ maxHeight: '100vh' }}>
          {/* Hero unit */}
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/video/QIAQ9Rd/videoblocks-male-doctor-with-checklist-animation-4k-video-animated_s-psbh2di_thumbnail-1080_01.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                pt: 8,
                pb: 4,
              }}
            >
              <Container maxWidth="sm">
                <Typography className={styles.heroTitle}
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  CONTROL ASISTENCIA
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Hospital Regional de Zacapa
                </Typography>
              </Container>
            </Box>
            <Container sx={{ py: 23 }} maxWidth="md">
              <Grid container spacing={4} columns={16}>
                <Grid item xs={8}>
                  <Card className={styles.cardLogin} sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="h5">
                        Dashboard
                      </Typography>
                      <Typography variant="body2">
                        Gestión de permisos, asistencia y justificaciones
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button className={styles.cardLogin_button} variant="contained">
                      <Link href="/login" underline="none">Iniciar Sesión</Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <Card className={styles.cardAsistencia} sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="h5">
                        Marcar Asistencia
                      </Typography>
                      <Typography variant="body2">
                        Marcar asistencia a los practicantes
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button className={styles.cardAsistencia_button} variant="contained">
                        <Link href={`/about/${id}`} underline="none">Entrar</Link>
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Box>
      </main>
      {/* Footer */}
      <Box className={styles.footer} sx={{ p: 2 }} component="footer">
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Sistema creado por alumnos de la UMG
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}