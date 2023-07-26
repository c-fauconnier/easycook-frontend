import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../shared/interfaces/lecture.interface';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LecturesService extends BaseService<Lecture> {
    endPoint: string = 'lectures';
    constructor(http: HttpClient) {
        super(http);
    }

    verifyTitle(title: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseApiURL}/${this.endPoint}/title/${title}`);
    }
}
