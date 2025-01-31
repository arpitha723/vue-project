import { createApp } from 'vue'
import 'font-awesome/css/font-awesome.css';
import App from './App.vue'
import store from './store';
import router from './router'; // Import Vue Router
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app')
