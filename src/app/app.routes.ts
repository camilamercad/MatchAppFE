import { Routes } from '@angular/router';
import { searchProject } from './pages/search-project/search-project';
import { Home } from './pages/home/home';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    {path: '', component: Home, pathMatch: 'full' },
    {'path': 'project', component: searchProject},
    {'path': 'detail/:id', component: ProjectDetail},
    {'path': 'profile/:id', component: Profile},
]
