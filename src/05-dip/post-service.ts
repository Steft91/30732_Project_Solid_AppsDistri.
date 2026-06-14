/**
 * APLICACIÓN DEL PRINCIPIO DE INVERSIÓN DE DEPENDENCIAS (DIP)
 *
 * PostService ya no depende de una implementación concreta como LocalDatabaseService.
 * Ahora depende de una abstracción: PostRepository.
 *
 * Esto permite inyectar diferentes proveedores de datos sin modificar PostService.
 */

export interface PostRepository {
    getPosts(): Promise<any[]>;
}

export class PostService {

    constructor(private repository: PostRepository) {}

    async getPosts(): Promise<any[]> {
        return this.repository.getPosts();
    }

}