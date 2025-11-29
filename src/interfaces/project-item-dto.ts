export interface ProjectListItemDto{
        id: number,
        title: string,
        description: string,
        idUser: number,
        username?: string,
        creationDate?: Date,
        idCategory?: number,
        category?: string,
        image?: string
}