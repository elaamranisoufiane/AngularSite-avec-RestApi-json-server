import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TskService } from 'src/app/services/tsk.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

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

}
