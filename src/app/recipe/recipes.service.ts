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

    // addRecipe(recipe: Recipe): Observable<boolean> {
    //     console.log(recipe);

    //     return this.http.post<Recipe>();
    // }
}
