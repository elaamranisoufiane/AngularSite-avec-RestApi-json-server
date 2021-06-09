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

  mytask: Task = {
    label: '',
    completed: false
  }

  tasks: Task[] = [];
  constructor(private taskService: TskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(){
    this.taskService.findAll()
    .subscribe(tasks => this.tasks = tasks)
  }
  deleteTask(id){
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id != id)
    })
  }
  persistTask(){
    this.taskService.persist(this.mytask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.restTask();
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
  }
  updateTask(task) {
    this.taskService.update(this.mytask)
    .subscribe((task) => {
      task = this.mytask;
      this.restTask();
      this.editForm = false;
    })
  }
 

}
