export default [
    {
        path: '/login',
        component: () => import ('@/views/auth/login'),
    },
    {
        path: '/register',
        component: () => import ('@/views/auth/register'),
    },
    {
        path: '/test',
        component: () => import ('@/views/test'),
    },
]
