import axios from "axios";
import { HttpClient } from "./news-service";

export class AxiosHttpClient implements HttpClient {

    async get<T>(url: string): Promise<T> {
        const response = await axios.get<T>(url);
        return response.data;
    }

}