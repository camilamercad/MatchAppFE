import { Component, input } from '@angular/core'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { RouterLink } from '@angular/router'
import { Project } from '../../../interfaces/project'
import { ProyectoListItemDto } from '../../../interfaces/proyecto-item-dto'

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input<ProyectoListItemDto>()
  buscando = input<boolean>(true)

  ruta = input<string | any[]>(`/detalle/${this.project()?.Id}`)

  readonly imgSrc = 'assets/img/template-preview.jpg'
}


