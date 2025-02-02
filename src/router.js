import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  { path: '/',
    component: () => import('./views/HospitalComponent.vue'), // Lazy load the Home component
  },
  {  
    path: '/group-info/:id',
    component: () => import('./views/GroupInfo.vue'),// Lazy load the group info component
    name: 'GroupInfo',props: true
  } // New screen route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
