import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TskService {
  url = "http://localhost:3000/tasks";
  constructor(private http: HttpClient) { }
  
  findAll() {
    return this.http.get<Task[]>(this.url);
  }
  delete(id) {
    return this.http.delete(`${this.url}/${id}`)
  }
  persist(task) {
    return this.http.post<Task>(this.url,task);
  }

  compelted(id, completed) {
    return this.http.patch(`${this.url}/${id}`,{completed: !completed})
  }
  update(task){
    return this.http.put(`${this.url}/${task.id}`,task);
  }

}
