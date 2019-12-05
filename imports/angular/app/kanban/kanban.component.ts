import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs';

import { addListMethod, removeListMethod } from '../../../api/lists/lists.methods';
import { addTaskMethod, removeTaskMethod } from '../../../api/tasks/tasks.methods';
import { IList, Lists } from '../../../models/list.model';
import { ITask, Tasks } from '../../../models/task.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'kanban',
  templateUrl: 'kanban.component.html'
})
export class KanbanComponent implements OnInit, OnDestroy {

  lists: IList[];
  tasks: ITask[];

  sub: Subscription;
  autorun: Subscription;

  sub2: Subscription;
  autorun2: Subscription;

  constructor(public us: UserService) { }

  ngOnInit() {
    this.sub = MeteorObservable.subscribe('lists-publication').subscribe(() => {
      this.autorun = MeteorObservable.autorun().subscribe(() => {
        this.lists = Lists.collection.find().fetch();
      });
    });

    this.sub2 = MeteorObservable.subscribe('tasks-publication').subscribe(() => {
      this.autorun2 = MeteorObservable.autorun().subscribe(() => {
        this.tasks = Tasks.collection.find().fetch();
      });
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
    if (this.autorun) this.autorun.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
    if (this.autorun2) this.autorun2.unsubscribe();
  }

  logout() {
    this.us.logout();
  }

  addList(name: string) {
    addListMethod.call({ name }, (err) => { });
  }

  removeList(listId: string) {
    removeListMethod.call({ listId }, (err) => { });
  }

  addTask({ title, listId }) {
    addTaskMethod.call({ title, listId }, (err) => { });
  }

  removeTask(taskId) {
    removeTaskMethod.call({ taskId }, (err) => { });
  }
}