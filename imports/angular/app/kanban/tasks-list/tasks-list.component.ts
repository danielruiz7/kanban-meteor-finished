import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { IList } from '../../../../models/list.model';
import { ITask } from '../../../../models/task.model';

@Component({
  selector: 'tasks-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @ViewChild('newTaskTitleInput', { static: true }) newTaskTitleInput: ElementRef;

  @Input() list: IList;
  @Input() tasks: ITask[];

  @Output() onAddTask = new EventEmitter<{ title: string, listId: string }>();
  @Output() onRemoveTask = new EventEmitter<String>();

  newTaskTitle = '';

  constructor() { }

  ngOnInit() {
  }

  addTask() {
    this.onAddTask.emit({
      title: this.newTaskTitle,
      listId: this.list._id
    });
    this.newTaskTitle = '';
    this.newTaskTitleInput.nativeElement.focus();
  }

  removeTask(task: ITask) {
    this.onRemoveTask.emit(task._id);
  }


}