import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _http = inject(HttpClient);

  getAll() : Observable<Category[]> {
    return this._http.get<Category[]>('http://localhost:3000/api/categories');
  }

  getById(id: number) : Observable<Category> {
    return this._http.get<Category>(`http://localhost:3000/api/categories/${id}`);
  }
}
