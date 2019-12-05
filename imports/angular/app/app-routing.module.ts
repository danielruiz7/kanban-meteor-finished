import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KanbanComponent } from './kanban/kanban.component';
import { LoggedInGuard } from './login/logged-in.guard';
import { LoginComponent } from './login/login.component';
import { NotLoggedInGuard } from './login/not-logged-in.guard';

const appRoutes: Routes = [

  {
    path: '',
    component: KanbanComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }