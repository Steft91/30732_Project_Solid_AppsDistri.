/**
 * APLICACIÓN DEL PRINCIPIO ABIERTO/CERRADO (OCP)
 *
 * Los servicios ya no dependen directamente de axios.
 * Ahora dependen de una abstracción HttpClient.
 *
 * Si después se quiere usar axios, fetch u otra librería,
 * solo se crea una nueva clase que implemente HttpClient,
 * sin modificar NewsService ni PhotosService.
 */

//import axios from 'axios';

export interface HttpClient {
    get<T>(url: string): Promise<T>;
}

export class FetchHttpClient implements HttpClient {

    async get<T>(url: string): Promise<T> {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return response.json() as Promise<T>;
    }

}

export class NewsService {

    constructor(private httpClient: HttpClient) {}

    async getLatestNews() {
        console.log('Obteniendo noticias de la reserva biológica...');

        return this.httpClient.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
    }

}

export class PhotosService {

    constructor(private httpClient: HttpClient) {}

    async getGallery() {
        console.log('Obteniendo galería de fotos de la reserva biológica...');

        return this.httpClient.get(
            'https://jsonplaceholder.typicode.com/photos'
        );
    }

}