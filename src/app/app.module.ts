import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { ParsePipe } from './parse.pipe';

@NgModule({
  declarations: [AppComponent, ParsePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NavigationModule.forRoot({
      baseRoute: null,
      routes: [
        {
          id: 'todos',
          route: 'todos'
        },
        {
          id: 'settings',
          route: 'settings'
        },
        {
          id: 'users',
          route: 'users/main'
        }
      ]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
