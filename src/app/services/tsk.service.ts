import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TskService {

  constructor(private http: HttpClient) { }
  
  findAll() {
    return this.http.get<Task[]>("http://localhost:3000/tasks");
  }
  delete(id) {
    return this.http.delete(`http://localhost:3000/tasks/${id}`)
  }
}
