import { createRouter, createWebHistory } from '@ionic/vue-router';
import Auth from './modules/auth'
import TabsPage from '../views/dashboard/index'

const routes = [
    ...Auth,
    {
        path: '/',
        component: () => import('@/views/landing-page/index'),
    },
    {
        path: '/dash_board/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/dash_board/plants'
            },
            {
                path: 'plants',
                component: () => import('@/views/dashboard/dashboard/index')
            },
            {
                path: 'scan_plant',
                component: () => import('@/views/dashboard/scans/index')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
