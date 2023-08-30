import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { Recipe } from '../shared/interfaces/recipe.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Upload } from '../shared/interfaces/upload.interface';

@Injectable({
    providedIn: 'root',
})
export class RecipesService extends BaseService<Recipe> {
    endPoint: string = 'recipes';
    constructor(http: HttpClient) {
        super(http);
    }

    uploadImage(media: FormData, collection: string): Observable<Upload> {
        return this.upload(media, collection);
    }

    isMyFavorite(id: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseApiURL}/${this.endPoint}/favorites/isfav/${id}`);
    }

    addToFavorites(id: string): Observable<any> {
        return this.http.post<any>(`${this.baseApiURL}/${this.endPoint}/favorites`, { id: id });
    }

    deleteFromMyFavorites(id: string): Observable<any> {
        return this.http.post<any>(`${this.baseApiURL}/${this.endPoint}/deleteFavorite`, { id: id });
    }
}
