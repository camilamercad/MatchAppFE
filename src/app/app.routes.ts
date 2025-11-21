import { Routes } from '@angular/router';
import { searchProject } from './searchProject/searchProject';
import { Home } from './home/home';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full' },
    {'path': 'project', component: searchProject},
    
];
