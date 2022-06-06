import {Component, OnInit} from '@angular/core';
import { DbService, Task,TaskList,UserTasks } from '../services/db.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  public press = 0;

  userData: UserTasks= {tasks: [],
  taskLists: []};

  taskLists: TaskList[]= [{
    id:1,
    description: 'Hello',
    isAllDone: false,
    tasks: [{id: 5,
      isDone: true,
      taskListid: 1,
      dueDate: '2022-10-10',
      location: 'My Home',
      description: 'This Task Desc',
      userid: undefined,}],
    userid:0,
  }];

  today: number = Date.now();

  constructor(private dbService: DbService) { }


  ionViewDidEnter() {

  }

  deleteToDo(id: number) {
    this.dbService.deleteTask(id).then(data => this.userData = data);
  }

  deleteList(id: number) {
    this.dbService.deleteTaskList(id).then(data => this.userData = data);
  }


  ngOnInit() {
    console.log('TestLog');
    this.dbService.getAllTasks().then(data => this.userData = data);
  }

  remove(item: Task) {
  this.deleteToDo(item.id);
  }

  update(item: Task) {
    if (item.isDone){
      this.dbService.updateTask(item.id,1);
    }else{
      this.dbService.updateTask(item.id,0);
    }
  }

  removeList(list: TaskList) {
    this.deleteList(list.id);
  }
}
