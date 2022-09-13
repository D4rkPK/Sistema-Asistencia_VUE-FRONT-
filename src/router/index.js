import Vue from 'vue'
import VueRouter from 'vue-router'

//HOME
import Home from '../views/home/home.vue';

// AUTH 
import Login from '../views/auth/login.vue';

// DASHBOARD
import Dashboard from '../views/dashboard/dashboard.vue';

// INICIO
import Inicio from '../views/inicio/inicio.vue';

// ASISTENCIA
import Asistencia from '../views/asistencia/asistencia.vue';

// PRACTICANTES
import Practicantes from '../views/practicantes/practicantes.vue';

// JUSTIFICACIONES
import Justificaciones from '../views/justificaciones/justificaciones.vue';

// REPORTES
import Reportes from '../views/reportes/reportes.vue';

// GESTIONES
import Areas from '../views/gestiones/area/area.vue';
import Puestos from '../views/gestiones/puesto/puesto.vue';
import Universidades from '../views/gestiones/universidad/universidad.vue';

// ABOUT
import About from '../views/about/about.vue';

// ERRORES
import error_401 from "../views/errors/401.vue";
import error_403 from "../views/errors/403.vue";
import error_404 from "../views/errors/404.vue";
import error_423 from "../views/errors/423.vue";
import error from "../views/errors/error.vue";
import network_error from "../views/errors/network_error.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard',
        name: 'inicio',
        component: Inicio
      },
      {
        path: '/asistencia',
        name: 'asistencia',
        component: Asistencia
      },
      {
        path: '/practicantes',
        name: 'practicantes',
        component: Practicantes
      },
      {
        path: '/justificaciones',
        name: 'justificaciones',
        component: Justificaciones
      },
      {
        path: '/reportes',
        name: 'reportes',
        component: Reportes
      },
      { 
        path: '/areas',
        name: 'areas',
        component: Areas
      },
      {
        path: '/puestos',
        name: 'puestos',
        component: Puestos
      },
      {
        path: '/universidades',
        name: 'universidades',
        component: Universidades
      },
      {
        path: '/about',
        name: 'about',
        component: About
      }
    ]
  },
  //RUTAS ERRORES
  {
    path: '/401',
    name: '401',
    component: error_401
  },
  {
    path: '/403',
    name: '403',
    component: error_403
  },
  {
    path: '/404',
    name: '404',
    component: error_404
  },
  {
    path: '/423',
    name: '423',
    component: error_423
  },
  {
    path: '/error',
    name: 'error',
    component: error
  },
  {
    path: '/network_error',
    name: 'network_error',
    component: network_error
  },
  {
    path: '*',
    redirect: "/404"
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
