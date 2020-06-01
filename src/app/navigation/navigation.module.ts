import { ModuleWithProviders, NgModule } from '@angular/core';
import { mergeConfig, NAVIGATION_CONFIG, NavigationConfig } from './config';
import { ModuleRoutePipe } from './module-route.pipe';
import { ModuleUrlPipe } from './module-url.pipe';
import { NavigationService } from './navigation.service';

const SHARED = [ModuleRoutePipe, ModuleUrlPipe];

@NgModule({
  declarations: [...SHARED],
  exports: [...SHARED]
})
export class NavigationModule {
  constructor(service: NavigationService) {}

  static forRoot(config: Partial<NavigationConfig> = {}): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        NavigationService,
        {
          provide: NAVIGATION_CONFIG,
          useValue: mergeConfig(config)
        }
      ]
    };
  }

  static forChild(config: Partial<NavigationConfig> = {}): ModuleWithProviders {
    return {
      ngModule: NavigationModule,
      providers: [
        NavigationService,
        {
          provide: NAVIGATION_CONFIG,
          useValue: mergeConfig(config)
        }
      ]
    };
  }
}
