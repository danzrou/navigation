import { Inject, Injectable } from '@angular/core';
import {
  ExtraOptions as NgRouterOptions,
  NavigationExtras,
  Router,
  ROUTER_CONFIGURATION
} from '@angular/router';
import { isEmptyString, toBoolean } from '@siemplify/utils';
import {
  mergeNavConfig,
  NAVIGATION_CONFIG,
  NavigationConfig,
  NavigationRouteConfig
} from './config';
import { encodeNavData } from './navigation-data';

let service: NavigationService;

export function getModuleUrl(
  module: string,
  config: NavigationRouteConfig = {}
) {
  return service.getModuleUrl(module, config);
}

export function getModuleUrlTree(
  module: string,
  config: NavigationRouteConfig = {}
) {
  return service.getModuleUrlTree(module, config);
}

export function getModuleRoute(module: string, extras = []) {
  return service.getModuleCommands(module, extras);
}

export function getNavigationConfig() {
  return service.getConfig();
}

@Injectable()
export class NavigationService {
  constructor(
    @Inject(NAVIGATION_CONFIG) protected config: NavigationConfig,
    @Inject(ROUTER_CONFIGURATION) protected routerConfig: NgRouterOptions,
    protected router: Router
  ) {
    if (!service) {
      service = this;
    }
  }

  getConfig(): NavigationConfig {
    return this.config;
  }

  getModuleUrlTree(module: string, config: NavigationRouteConfig) {
    const { navExtras, extras, withBase, navigationData } = mergeNavConfig(
      config
    );
    const route = this.getConfigRoute(module);
    const base = (withBase && this.getBaseRoute(false)) || '';
    const urlTree = this.router.createUrlTree(
      [base, ...this.splitRoute(route), ...extras],
      this.addNavigationData(navExtras, navigationData)
    );
    return urlTree;
  }

  getModuleUrl(module: string, config: NavigationRouteConfig = {}) {
    return this.appendHash(
      this.router.serializeUrl(this.getModuleUrlTree(module, config))
    );
  }

  getModuleCommands(module: string, extras = []): any[] {
    const route = this.getConfigRoute(module);
    if (route) {
      return [this.getBaseRoute(false), ...this.splitRoute(route), ...extras];
    }
    return [this.getBaseRoute(false), module, ...extras];
  }

  navigateToModule(module: string, config: NavigationRouteConfig = {}) {
    const route = this.getModuleUrlTree(module, config);
    return this.router.navigateByUrl(route);
  }

  getBaseRoute(withHash: boolean = true) {
    const baseRoute = this.config.baseRoute || '';
    return (withHash && this.appendHash(baseRoute)) || baseRoute;
  }

  protected appendHash(route: string) {
    const withHash = toBoolean(this.routerConfig.useHash);
    return `${withHash ? '#' : ''}${route}`;
  }

  protected getConfigRoute(id: string): string {
    const route = this.config.routes.find((route) => route.id === id);
    return (route && route.route) || id;
  }

  protected splitRoute(route: string) {
    return (!isEmptyString(route) && route.split('/')) || [];
  }

  protected addNavigationData(
    navExtras: NavigationExtras,
    navigationData: any
  ) {
    if (navigationData) {
      return {
        ...navExtras,
        queryParams: { [this.config.dataKey]: encodeNavData(navigationData) }
      };
    }
    return navExtras;
  }
}
