import type { RouteRecordNormalized } from 'vue-router';

const modules = import.meta.glob('./modules/*.ts', { eager: true });
const externalModules = import.meta.glob('./externalModules/*.ts', {
  eager: true,
});

function formatModules(_modules: any, result: RouteRecordNormalized[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default;
    if (!defaultModule) return;
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule];
    result.push(...moduleList);
  });
  return result;
}

// 所有菜单

export const appRoutes: RouteRecordNormalized[] = formatModules(modules, []);

// 额外菜单

export const appExternalRoutes: RouteRecordNormalized[] = formatModules(
  externalModules,
  []
);
