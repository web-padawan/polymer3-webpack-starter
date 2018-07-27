import { Router } from '@vaadin/router';
import { EMPLOYEE_LIST, NEW_EMPLOYEE } from './urls';

export function init(outlet) {
  const router = new Router(outlet);
  router.setRoutes([
    {
      path: '/',
      redirect: EMPLOYEE_LIST
    },
    {
      path: EMPLOYEE_LIST,
      component: 'employee-list',
      action: () => {
        import(/* webpackChunkName: "list" */ '../views/employee-list');
      }
    },
    {
      path: NEW_EMPLOYEE,
      component: 'employee-new',
      action: () => {
        import(/* webpackChunkName: "new" */ '../views/employee-new');
      }
    },
    {
      path: '(.*)+',
      component: 'app-404',
      action: () => {
        import(/* webpackChunkName: "404" */ '../views/404');
      }
    }
  ]);
}
