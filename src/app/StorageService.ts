import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this.storage = await this.storage.create();
  }

  public addTask(value: any){
    let tasks = [];

    tasks.push(value);

    this.storage?.set('tasks', tasks);
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    const tasks = [];



    this.storage?.set(key, value);
    console.log('Set key:'+key+' value: '+value);
  }

  public getTasks(){

    const tasks = this.storage.get('tasks');

    /*return [{desc: 'This is a task,Lorem Ipsum',
            dueDate: '2023-11-12',
            location: 'Hogwarts',
            done: false,
    }];*/

    return tasks || [{}];
  }
}
