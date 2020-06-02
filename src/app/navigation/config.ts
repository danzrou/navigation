import { InjectionToken } from '@angular/core';
import { NavigationExtras } from '@angular/router';

export const NAVIGATION_CONFIG = new InjectionToken('NavigationConfig');

export interface NavigationConfig<T = any> {
  baseRoute?: string;
  routes?: { id: string; route: string }[];
  dataKey?: string;
}

export interface NavigationRouteConfig<T extends object = object> {
  extras?: any[];
  navExtras?: NavigationExtras;
  withBase?: boolean;
  navigationData?: T;
}

export function mergeConfig(
  config: Partial<NavigationConfig>
): NavigationConfig {
  return {
    baseRoute: 'main',
    routes: [],
    dataKey: 'navigationData',
    ...config
  };
}

export function mergeNavConfig(
  config: Partial<NavigationRouteConfig>
): NavigationRouteConfig {
  return {
    extras: [],
    navExtras: {},
    withBase: true,
    ...config
  };
}
