import { createRouter, createWebHistory } from 'vue-router';
import WalletView from '@/views/WalletView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WalletView
    }
  ]
});

export default router;
