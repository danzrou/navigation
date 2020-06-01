import { Inject, Injectable } from '@angular/core';
import { ExtraOptions, Router, ROUTER_CONFIGURATION } from '@angular/router';
import { toBoolean } from '@siemplify/utils';
import {
  mergeNavConfig,
  NAVIGATION_CONFIG,
  NavigationConfig,
  NavigationRouteConfig
} from './config';

let service: NavigationService;

export function getCurrentHost(withProtocol: boolean = true) {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return withProtocol ? `${protocol}//${host}/` : `${host}/`;
}

export function getModuleUrl(module: string, config: NavigationRouteConfig) {
  return service.getModuleUrl(module, config);
}

export function getModuleUrlTree(
  module: string,
  config: NavigationRouteConfig
) {
  return service.getModuleUrlTree(module, config);
}

export function getModuleRoute(module: string, extras = []) {
  return service.getModuleRoute(module, extras);
}

@Injectable()
export class NavigationService {
  constructor(
    @Inject(NAVIGATION_CONFIG) protected config: NavigationConfig,
    @Inject(ROUTER_CONFIGURATION) protected routerConfig: ExtraOptions,
    protected router: Router
  ) {
    service = this;
  }

  getModuleUrlTree(module: string, config: NavigationRouteConfig) {
    const { navExtras, extras, withBase } = mergeNavConfig(config);
    const base = (withBase === true && this.getBaseRoute(false)) || '';
    const urlTree = this.router.createUrlTree(
      [base, module, ...extras],
      navExtras
    );
    return urlTree;
  }

  getModuleUrl(module: string, config: NavigationRouteConfig = {}) {
    return this.appendHash(
      this.router.serializeUrl(this.getModuleUrlTree(module, config))
    );
  }

  getModuleRoute(module: string, extras = []): any[] {
    return [this.getBaseRoute(false), module, ...extras];
  }

  navigateToModule(module: string, config: NavigationRouteConfig = {}) {
    const route = this.getModuleUrlTree(module, config);
    return this.router.navigateByUrl(route);
  }

  getBaseRoute(full: boolean = true) {
    const baseRoute = this.config.baseRoute || '';
    return (full && this.appendHash(baseRoute)) || baseRoute;
  }

  getRouteUrl(route: string, withBase: boolean = true, full: boolean = true) {
    return (withBase && this.getBaseRoute(full)) || '';
  }

  protected appendHash(route: string) {
    const withHash = toBoolean(this.routerConfig.useHash);
    return `${withHash ? '#' : ''}${route}`;
  }
}
