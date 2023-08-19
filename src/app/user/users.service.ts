import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { User } from '../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UsersService extends BaseService<User> {
    endPoint = 'users';
    constructor(http: HttpClient) {
        super(http);
    }
}
