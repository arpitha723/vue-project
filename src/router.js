import { createRouter, createWebHistory } from 'vue-router';
import HospitalComponent from './views/HospitalComponent.vue'; // Tree Structure Page
import GroupInfo from './views/GroupInfo.vue'; // New Screen

const routes = [
  { path: '/', component: HospitalComponent }, // Default route (Tree structure)
  { path: '/group-info/:id', component: GroupInfo ,name: 'GroupInfo',props: true} // New screen route
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
