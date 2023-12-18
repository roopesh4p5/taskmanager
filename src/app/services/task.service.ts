import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private base_url = "http://localhost:3000/"

  constructor( private  _http : HttpClient) { }

  getAllTasks():Observable<Task[]> {
    return this._http.get<Task[]>(`${this.base_url}tasks/`)
  }
  
  createNewTask(newTask: Task): Observable<Task> {
   return this._http.post<Task>(`${this.base_url}tasks/`, newTask)
  }
  
  updateTask(updatedTask: Task): Observable<Task> {
    return this._http.put<Task>(`${this.base_url}tasks/${updatedTask.id}`, updatedTask);
  }
  
  deleteTask(taskId: number): Observable<any> {
    return this._http.delete(`${this.base_url}tasks/${taskId}`)
  }
}
