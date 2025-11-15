import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private _http = inject(HttpClient);

  getAll() : Observable<{ Id: number; Nombre: string; }[]> {
    return this._http.get<{ Id: number; Nombre: string; }[]>('http://localhost:3000/api/Categorias');
  }
}
