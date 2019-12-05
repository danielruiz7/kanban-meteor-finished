import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { IList } from '../../../../models/list.model';
import { ITask } from '../../../../models/task.model';

@Component({
  selector: 'kanban-board',
  templateUrl: 'kanban-board.component.html',
  styleUrls: ['kanban-board.component.scss']
})

export class KanbanBoardComponent implements OnInit, OnChanges {
  @ViewChild('newListNameInput', { static: true }) newListNameInput: ElementRef;

  @Input() lists: IList[];
  @Output() onAddList = new EventEmitter<String>();
  @Output() onRemoveList = new EventEmitter<String>();

  @Input() tasks: ITask[];
  @Output() onAddTask = new EventEmitter<ITask>();
  @Output() onRemoveTask = new EventEmitter<ITask>();

  tasksByList = {};

  newListName = '';

  constructor() { }

  ngOnInit() { 

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks) {
      this.initTasksByList();
    }
  }

  private initTasksByList() {
    if (!this.lists || !this.tasks) return;
    
    console.log(this.tasks);
    this.lists.forEach(l => {
      this.tasksByList[l._id] = this.tasks.filter((t) => { return t.listId === l._id });
    });

    console.log(this.tasksByList);
  }

  addList() {
    this.onAddList.emit(this.newListName);
    this.newListName = '';
    this.newListNameInput.nativeElement.focus();
  }

  removeList(listId) {
    this.onRemoveList.emit(listId);
  }

  
}