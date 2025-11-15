import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private _http = inject(HttpClient);

    GetByName(name: string) : Observable<boolean>{
        return this._http.get<boolean>(`http://localhost:3000/api/Usuarios/Nombre/${name}`);
    }

    Add(user: User) : Observable<void>{
        return this._http.post<void>('http://localhost:3000/api/Usuarios/', user);
    }
}
