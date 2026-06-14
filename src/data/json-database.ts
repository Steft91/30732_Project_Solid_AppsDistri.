import { PostRepository } from "../05-dip/post-service";

export class JsonDatabaseService implements PostRepository {

    async getPosts(): Promise<any[]> {
        console.log("Obteniendo publicaciones desde JsonDatabaseService...");

        return [
            {
                id: 1,
                title: "Publicación cargada desde JSON",
                body: "Datos simulados desde un proveedor JSON."
            },
            {
                id: 2,
                title: "Inventario digital de la reserva",
                body: "Información obtenida desde una fuente JSON."
            }
        ];
    }

}