import { PostRepository } from "../05-dip/post-service";

export class LocalDatabaseService implements PostRepository {

    async getPosts(): Promise<any[]> {
        console.log("Obteniendo publicaciones desde LocalDatabaseService...");

        return [
            {
                id: 1,
                title: "Registro de especies de la reserva",
                body: "Publicación almacenada en la base de datos local."
            },
            {
                id: 2,
                title: "Reporte de monitoreo ambiental",
                body: "Información obtenida desde el proveedor local."
            }
        ];
    }

}