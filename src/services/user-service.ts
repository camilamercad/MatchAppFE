import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { GetUserByNameResponse } from '../interfaces/get-user-by-name-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _http = inject(HttpClient);

    GetByName(name: string) : Observable<GetUserByNameResponse>{
        return this._http.get<GetUserByNameResponse>(`http://localhost:3000/api/users/name/${name}`);
    }

    Add(user: User) : Observable<void>{
        return this._http.post<void>('http://localhost:3000/api/users/', user);
    }

    GetById(id: number) : Observable<User>{
        return this._http.get<User>(`http://localhost:3000/api/users/${id}`);
    }

    UpdateById(id: number, user: User) : Observable<void>{
        return this._http.put<void>(`http://localhost:3000/api/users/${id}`, user);
    }   
}
