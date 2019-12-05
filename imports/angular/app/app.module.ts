import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanBoardComponent } from './kanban/kanban-board/kanban-board.component';
import { KanbanComponent } from './kanban/kanban.component';
import { TasksListComponent } from './kanban/tasks-list/tasks-list.component';
import { LoggedInGuard } from './login/logged-in.guard';
import { LoginComponent } from './login/login.component';
import { NotLoggedInGuard } from './login/not-logged-in.guard';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KanbanComponent,
    KanbanBoardComponent,
    TasksListComponent
  ],
  entryComponents: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [
    LoggedInGuard,
    NotLoggedInGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
