import { createRouter, createWebHistory } from 'vue-router';
import Home from './../views/Home.vue';
import About from './../views/About.vue';
import Blog from './../views/Blog.vue';
import Snippets from './../views/Snippets.vue';
import Projects from './../views/Projects.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/snippets',
    name: 'Snippets',
    component: Snippets
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;