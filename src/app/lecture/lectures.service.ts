import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../shared/interfaces/lecture.interface';

@Injectable({
    providedIn: 'root',
})
export class RecipesService extends BaseService<Lecture> {
    endPoint: string = 'recipes';
    constructor(http: HttpClient) {
        super(http);
    }
}
