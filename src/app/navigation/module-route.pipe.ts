import { Pipe, PipeTransform } from '@angular/core';
import { UrlTree } from '@angular/router';
import { NavigationService } from './navigation.service';

@Pipe({
  name: 'moduleRoute'
})
export class ModuleRoutePipe implements PipeTransform {
  constructor(private service: NavigationService) {}

  transform(module: string, extras: any[] = []): any[] | undefined {
    if (!module) {
      return undefined;
    }
    return this.service.getModuleRoute(module, extras);
  }
}
