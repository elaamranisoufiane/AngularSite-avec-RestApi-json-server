import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TskService } from 'src/app/services/tsk.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
editForm = false;
displayForm = false;
searchText = '';

  mytask: Task = {
    label: '',
    completed: false
  }

  tasks: Task[] = [];
  resulttasks : Task[] = [];
  constructor(private taskService: TskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => this.tasks = this.resulttasks = tasks)
     
  }
  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks= this.resulttasks = this.tasks.filter(task => task.id != id)
    })
  }
  persistTask(){
    this.taskService.persist(this.mytask)
    .subscribe((task) => {
      this.tasks = this.resulttasks = [task, ...this.tasks];
      this.restTask();
      this.displayForm = false;
    })
  }

  restTask() {
    this.mytask = {
      label: '',
      completed: false
    }
  }
  toggleCompleted(task) {
    this.taskService.compelted(task.id, task.completed)
    .subscribe(() => {
     task.completed = !task.completed
    })
  }
  editTask(task){
    this.mytask = task;
    this.editForm = true;
    this.displayForm = true;
  }
  updateTask(task) {
    this.taskService.update(this.mytask)
    .subscribe((task) => {
      task = this.mytask;
      this.restTask();
      this.editForm = false;
      this.displayForm = false;
    })
  }

  sreachTasks() { 
    this.resulttasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }
  
  

}
