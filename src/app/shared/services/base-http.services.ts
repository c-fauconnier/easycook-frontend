import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload } from '../interfaces/upload.interface';
import { environment } from '../../environments/environment.prod';

@Injectable()
export abstract class BaseService<T> {
    baseApiURL: string = environment.apiUrl;
    abstract endPoint: string;

    constructor(public http: HttpClient) {}

    create(dto: any): Observable<T> {
        return this.http.post<any>(`${this.baseApiURL}/${this.endPoint}`, dto);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseApiURL}/${this.endPoint}`);
    }

    get(id: string): Observable<T> {
        return this.http.get<T>(`${this.baseApiURL}/${this.endPoint}/${id}`);
    }

    update(id: string, dto: any): Observable<unknown> {
        return this.http.put<unknown>(`${this.baseApiURL}/${this.endPoint}/${id}`, dto);
    }

    delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.baseApiURL}/${this.endPoint}/${id}`);
    }

    upload(media: FormData, collection: string): Observable<Upload> {
        return this.http.post<Upload>(`${this.baseApiURL}/files/upload?collection=${collection}`, media);
    }
}
