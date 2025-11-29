import { Routes } from '@angular/router';
import { searchProject } from './searchProject/searchProject';
import { Home } from './home/home';
import { ProjectDetail } from './project-detail/project-detail';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full' },
    {'path': 'project', component: searchProject},
    {'path': 'detail/:id', component: ProjectDetail},
]
