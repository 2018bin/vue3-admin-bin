import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PROFILE: AppRouteRecordRaw = {
  path: '/manager',
  name: 'manager',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.manager',
    requiresAuth: true,
    icon: 'icon-file',
    order: 4,
  },
  children: [
    {
      path: 'car',
      name: 'Car',
      component: () => import('@/views/manager/car/index.vue'),
      meta: {
        locale: 'menu.manager.car',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'address',
      name: 'Address',
      component: () => import('@/views/manager/address/index.vue'),
      meta: {
        locale: 'menu.manager.address',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default PROFILE;
