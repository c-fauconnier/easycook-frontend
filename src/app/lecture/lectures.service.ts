import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { Lecture } from '../shared/interfaces/lecture.interface';

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

    addLecture(lecture: Lecture, admin: User): Observable<Lecture> {
        return this.http.post<Lecture>(`${this.baseApiURL}/${this.endPoint}`, { lecture, admin });
    }
}
