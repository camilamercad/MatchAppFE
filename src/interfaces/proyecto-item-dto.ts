export interface ProyectoListItemDto{
        Id: number,
        Titulo: string,
        Descripcion: string,
        NombreUsuario?: string,
        FechaCreacion?: Date,
        IdCategoria?: number,
        Imagen?: string
}