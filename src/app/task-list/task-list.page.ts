import {Component, OnInit} from '@angular/core';
import {StorageService} from '../StorageService';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
  providers:[StorageService],
})
export class TaskListPage implements OnInit {

  public todoList = [{
    itemName: 'Task 1',
    itemDueDate: '2022-10-05',
    itemCategory: 'Work'
  },
    {
      itemName: 'Task 2',
      itemDueDate: '2022-10-05',
      itemCategory: 'Recurrent'
    },
    {
      itemName: 'This is an extremely long task hello yes I would like one task please but what would happen if we made it so long that litterally who the hell would do this',
      itemDueDate: '2022-10-05',
      itemCategory: 'Personal'
    }
  ];

  tasks: any = [];

  today: number = Date.now();

  constructor(private storage: StorageService) {
    this.loadTasks();
  }

  async loadTasks(){
    this.tasks = await this.storage.getTasks();
  }

  ngOnInit() {
  }

}
