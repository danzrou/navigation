import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationModule } from '../navigation/navigation.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NavigationModule.forChild({
      baseRoute: 'users',
      dataKey: 'data',
      routes: [
        {
          id: 'user',
          route: 'users/user'
        },
        {
          id: 'test',
          route: 'ext/test'
        }
      ]
    }),
    FormsModule
  ]
})
export class UsersModule { }
