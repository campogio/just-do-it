import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

export interface Task {
  id: number;
  description: string;
  isDone: boolean;
  dueDate: string;
  location: string;
  userid: number;
  taskListid: number;
}

export interface TaskList {
  id: number;
  description: string;
  isAllDone: boolean;
  tasks: Task[];
  userid: number;
}

export interface UserTasks{
  tasks: Task[];
  taskLists: TaskList[];
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private dbInstance: SQLiteObject;

  constructor(private sqlite: SQLite) { }


  async getAllTasks() {
    let userData: UserTasks;
    const lists: TaskList[] = [];
    return this.sqlite.create({ name: 'data.db', location: 'default' }).then(
      (db) => {
        this.dbInstance = db;

        this.seedDatabase(db);

        userData = this.getAllRecords();
      }
    ).catch().then((e) => {
      console.log(e);
      return userData;
    });
  }

  private seedDatabase(db: SQLiteObject){
    this.dbInstance = db;
    // eslint-disable-next-line max-len
    db.executeSql('CREATE TABLE IF NOT EXISTS task(id INTEGER PRIMARY KEY AUTOINCREMENT,description VARCHAR(50), isDone INTEGER(1), dueDate TEXT, location TEXT,user_id INTEGER, taskList_id INTEGER);',[]).catch(e => console.log(e));
    // eslint-disable-next-line max-len
    db.executeSql('CREATE TABLE IF NOT EXISTS taskList(id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR(50), isAllDone INTEGER(1),user_id INTEGER);', []).catch(e => console.log(e));
  }


  //Test Task seed
  private seedTasks(){
    this.dbInstance.executeSql('INSERT or IGNORE INTO task(id, description, isDone,dueDate,location,user_id,taskList_id)'
      + ' VALUES (1, \'test task\', 0,\'2022-09-11\',\'location\',0,null);');
  }

  private getTasksForList(id: number): Task[]{
    let tasks: Task[] = [];

    this.dbInstance.executeSql('select * from task WHERE taskList_id='+id, []).then(
      (res) => {
        for (let x = 0; x < res.rows.length; x++) {
          tasks.push(res.rows.item(x));
        }
      });

    return tasks;
  }

  private getAllTaskLists(): TaskList[]{
    const taskLists: TaskList[] = [];

    this.dbInstance.executeSql('select * from taskList', []).then(
      (res) => {
        for(let x=0; x<res.rows.length; x++){
          const list: TaskList = {
            id: res.rows.item(x).id,
            description: res.rows.item(x).description,
            isAllDone: res.rows.item(x).isAllDone,
            tasks: this.getTasksForList(res.rows.item(x).id),
            //TODO ADD USER
            userid: 0,
          };
          taskLists.push(list);
        }

      }
    );

    return  taskLists;
  }

  private getAllRecords(): UserTasks {
    const todos: Task[] = [];
    const lists: TaskList[] = this.getAllTaskLists();
    this.dbInstance.executeSql('select * from task WHERE taskList_id IS NULL', []).then(
      (res) => {
        for(let x=0; x<res.rows.length; x++)
          {
              todos.push(res.rows.item(x));
          }
      }
    ).catch(e => {
      console.log(e);
    });

    const userTasks: UserTasks={tasks: todos,taskLists:lists};

    return userTasks;
  }

  async addTaskList(list: TaskList){
    this.dbInstance.executeSql('insert into taskList(description, isAllDone,user_id) VALUES(?, ?,?)',
      //TODO ADD USER
      [list.description, 1,0])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async addTask(task: Task) {
    if(task.location === undefined){
      task.location = '';
    }
    if(task.dueDate === undefined){
      task.dueDate = '';
    }
    this.dbInstance.executeSql('insert into task(description, isDone,dueDate,location) VALUES(?, ?,?,?)',
      [task.description, 0,task.dueDate,task.location])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async addTaskToList(task: Task) {
    if(task.location === undefined){
      task.location = '';
    }
    if(task.dueDate === undefined){
      task.dueDate = '';
    }
    this.dbInstance.executeSql('insert into task(description, isDone,dueDate,location,taskList_id) VALUES(?, ?,?,?,?)',
      [task.description, 0,task.dueDate,task.location,task.taskListid])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async updateTask(id: number,done: number) {
    this.dbInstance.executeSql('UPDATE task SET isDone='+done+' WHERE id=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteTasks(){
    this.dbInstance.executeSql('DELETE FROM task')
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteTaskList(id: number) {
    this.dbInstance.executeSql('DELETE FROM taskList WHERE id=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }

  async deleteTask(id: number) {
    this.dbInstance.executeSql('DELETE FROM task WHERE id=?', [id])
      .catch(e => console.log(e));
    return this.getAllRecords();
  }
}
