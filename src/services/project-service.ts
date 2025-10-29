import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private _http = inject(HttpClient);

  getAll(titulo?: string, descripcion?: string, idUsuario?: number, idCategoria?: string, ordenarPorFecha?: string) : Observable<Project[]> {
    let params = new HttpParams();
    if (titulo) params = params.set('Titulo', titulo);
    if (descripcion) params = params.set('Descripcion', descripcion);
    if (idUsuario) params = params.set('IdUsuario', idUsuario.toString());
    if (idCategoria) params = params.set('IdCategoria', idCategoria);
    if (ordenarPorFecha) params = params.set('OrdenarPorFecha', ordenarPorFecha);

    return this._http.get<Project[]>('http://localhost:3000/api/Proyectos', { params });
  }

  GetById(id: number) : Observable<Project> {
    return this._http.get<Project>(`http://localhost:3000/api/Proyectos/${id}`);
  }

  Add(proyecto: Project) : Observable<void> {
    return this._http.post<void>('http://localhost:3000/api/Proyectos', proyecto);
  }

  DeleteById(id: number) : Observable<void> {
    return this._http.delete<void>(`http://localhost:3000/api/Proyectos/${id}`);
  }

  UpdateById(id: number, proyecto: Project) : Observable<void> {
    return this._http.put<void>(`http://localhost:3000/api/Proyectos/${id}`, proyecto);
  }
}