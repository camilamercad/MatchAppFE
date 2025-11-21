export interface ProyectoListItemDto{
        Id: number,
        Titulo: string,
        Descripcion: string,
        IdUsuario: number,
        NombreUsuario?: string,
        FechaCreacion?: Date,
        IdCategoria?: number,
        Categoria?: string,
        Imagen?: string
}