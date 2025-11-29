import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs';
import { ProjectListItemDto } from '../interfaces/project-item-dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _http = inject(HttpClient);

  getAll(title?: string, description?: string, user?: string, idCategory?: string, orderByDate?: string) : Observable<ProjectListItemDto[]> {
    let params = new HttpParams();
    if (title) params = params.set('title', title);
    if (description) params = params.set('description', description);
    if (user) params = params.set('username', user);
    if (idCategory) params = params.set('idCategory', idCategory);
    if (orderByDate) params = params.set('orderByDate', orderByDate);

    return this._http.get<ProjectListItemDto[]>('http://localhost:3000/api/projects', { params });
  }

  GetById(id: number) : Observable<Project> {
    return this._http.get<Project>(`http://localhost:3000/api/projects/${id}`);
  }

  Add(project: Project) : Observable<void> {
    return this._http.post<void>('http://localhost:3000/api/projects', project);
  }

  DeleteById(id: number) : Observable<void> {
    return this._http.delete<void>(`http://localhost:3000/api/projects/${id}`);
  }

  UpdateById(id: number, project: Project) : Observable<void> {
    return this._http.put<void>(`http://localhost:3000/api/projects/${id}`, project);
  }
}