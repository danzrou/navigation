import { InjectionToken } from '@angular/core';
import { NavigationExtras } from '@angular/router';

export const NAVIGATION_CONFIG = new InjectionToken('NavigationConfig');

export interface NavigationConfig<T = any> {
  baseRoute?: string;
}

export interface NavigationRouteConfig {
  extras?: any[];
  navExtras?: NavigationExtras;
  withBase?: boolean;
}

export function mergeConfig(
  config: Partial<NavigationConfig>
): NavigationConfig {
  return {
    baseRoute: 'main',
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
