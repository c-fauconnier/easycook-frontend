import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { HttpClient } from '@angular/common/http';
import { Lecture } from '../shared/interfaces/lecture.interface';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends BaseService<Lecture> {
    endPoint: string = 'users';
    emptyUser: User = {} as User;

    private userDataSubject = new BehaviorSubject<User>(this.emptyUser);
    userData$ = this.userDataSubject.asObservable();

    setUserData(userData: User) {
        this.userDataSubject.next(userData);
    }
    constructor(http: HttpClient) {
        super(http);
    }

    getProfile(id: string): Observable<User> {
        return this.http.get<User>(`${this.baseApiURL}/${this.endPoint}/${id}`);
    }
}
