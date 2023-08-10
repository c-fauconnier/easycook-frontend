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

    private _user: DecodedToken = {} as DecodedToken;
    private user$: Subject<any> = new Subject();
    public isConnected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.token);

    constructor(http: HttpClient) {
        super(http);
    }

    set user(user: any) {
        this._user = user;
        this.user$.next(user);
    }

    get user() {
        return this._user;
    }

    get token(): string {
        const token = localStorage.getItem('easycook_token');
        if (token) return token;
        return '';
    }

    register(dto: registerDto): Observable<User | []> {
        return this.http.post<User | []>(`${this.baseApiURL}/users`, dto);
    }

    login(dto: LoginDto): Observable<AccessToken | any> {
        return this.http.post<AccessToken | any>(`${this.baseApiURL}/${this.endPoint}/login`, dto).pipe(
            tap((res: AccessToken | any) => localStorage.setItem('easycook_token', res.access_token)),
            map((res: AccessToken | any) => {
                if (res.access_token) {
                    this.user = jwt_decode(res.access_token);
                    this.isConnected$.next(true);
                }
                return res;
            })
        );
    }

    disconnect() {
        localStorage.removeItem('easycook_token');
        this.user$.next(null);
        this.isConnected$.next(false);
    }
}
