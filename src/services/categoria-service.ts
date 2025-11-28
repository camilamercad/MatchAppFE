import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private _http = inject(HttpClient);

  getAll() : Observable<Categoria[]> {
    return this._http.get<Categoria[]>('http://localhost:3000/api/Categorias');
  }

  getById(id: number) : Observable<Categoria> {
    return this._http.get<Categoria>(`http://localhost:3000/api/Categorias/${id}`);
  }
}
