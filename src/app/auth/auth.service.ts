import { HttpClient } from '@angular/common/http';
import { BaseService } from '../shared/services/base-http.services';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, tap, BehaviorSubject } from 'rxjs';
import { LoginDto } from '../shared/dto/login.dto';
import { User } from '../shared/interfaces/user.interface';
import { AccessToken } from '../shared/interfaces/access-token.interface';
import jwt_decode from 'jwt-decode';
import { registerDto } from '../shared/dto/register.dto';
import { DecodedToken } from '../shared/interfaces/decoded-token.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService extends BaseService<any> {
    endPoint: string = 'auth';

    /*
     * Global variables and Subjects needed for dynamic behavior (connected state and user infos)
     */
    private _user: DecodedToken = {} as DecodedToken;
    public user$: Subject<any> = new Subject();
    public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.token);

    constructor(http: HttpClient) {
        super(http);
    }

    // Setter to modify both "user" variables at the same time
    set user(user: DecodedToken) {
        this._user = user;
        this.user$.next(user);
    }

    // Getter to work with user data decoded outside the service
    get user() {
        this._user = jwt_decode(this.token);
        return this._user;
    }

    // Simple function to know role status
    isAdmin(): boolean {
        if (this.token) {
            return this.user.role === 'admin' ? true : false;
        } else {
            return false;
        }
    }

    get token(): string {
        const token = localStorage.getItem('easycook_token');
        if (token) return token;
        return '';
    }

    // Register method eexpecting to receive a registerDto object and send it to the backend
    register(dto: registerDto): Observable<User | []> {
        return this.http.post<User | []>(`${this.baseApiURL}/users`, dto);
    }

    /*
     * Login method sending a LoginDto object and expecting an AccessToken response
     * or any type response if error.
     * If response has access_token property => we store it in localStorage and update our users variables
     */
    login(dto: LoginDto): Observable<AccessToken | any> {
        return this.http.post<AccessToken | any>(`${this.baseApiURL}/${this.endPoint}/login`, dto).pipe(
            tap((res: AccessToken | any) => {
                if (res.access_token) {
                    localStorage.setItem('easycook_token', res.access_token);
                }
            }),
            map((res: AccessToken | any) => {
                if (res.access_token) {
                    console.log('AUTH SERVICE');

                    this.user = jwt_decode(res.access_token);
                    this.isConnected$.next(true);
                }
                return res;
            })
        );
    }

    /*
     * Logout method which removes localStorage and connected state as well as user$ subject
     */
    disconnect() {
        localStorage.removeItem('easycook_token');
        this.user$.next(null);
        this.isConnected$.next(false);
        location.href = '/auth/login';
    }
}
