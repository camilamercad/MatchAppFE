import { Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { GetUserByNameResponse } from '../interfaces/get-user-by-name-response';

const STORAGE_KEY = 'usuario_actual';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUser = signal<User | null>(null);

  constructor() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        this.currentUser.set(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }

  login(usuario: GetUserByNameResponse) {
    this.currentUser.set(usuario.usuario);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario.usuario));
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }
}