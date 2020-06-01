import { Pipe, PipeTransform } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavigationService } from './navigation.service';

@Pipe({
  name: 'moduleUrl'
})
export class ModuleUrlPipe implements PipeTransform {
  constructor(private service: NavigationService) {}

  transform(
    module: string,
    extras: any[] = [],
    navExtras: NavigationExtras = {}
  ): any {
    if (!module) {
      return module;
    }
    return this.service.getModuleUrl(module, { extras, navExtras });
  }
}
