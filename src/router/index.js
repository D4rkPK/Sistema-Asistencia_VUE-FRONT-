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

// GESTIONES
import Areas from '../views/gestiones/area/area.vue';
import Puestos from '../views/gestiones/puesto/puesto.vue';
import Universidades from '../views/gestiones/universidad/universidad.vue';

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
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
