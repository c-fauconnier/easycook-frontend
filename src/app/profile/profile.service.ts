import { Injectable } from '@angular/core';
import { BaseService } from '../shared/services/base-http.services';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { FavoriteRecipes } from '../shared/interfaces/favorite-recipes.interface';
import { FavoriteLectures } from '../shared/interfaces/favorite-lectures.interface';
import { Recipe } from '../shared/interfaces/recipe.interface';

@Injectable({
    providedIn: 'root',
})
export class ProfileService extends BaseService<User> {
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

    sendConfirmationEmail(): Observable<void> {
        return this.http.get<void>(`${this.baseApiURL}/${this.endPoint}/email`);
    }

    getUserFavoriteRecipes(): Observable<FavoriteRecipes[]> {
        return this.http.get<FavoriteRecipes[]>(`${this.baseApiURL}/${this.endPoint}/favoriteRecipes`);
    }

    getUserFavoriteLectures(): Observable<FavoriteLectures[]> {
        return this.http.get<FavoriteLectures[]>(`${this.baseApiURL}/${this.endPoint}/favoriteLectures`);
    }

    getUserRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.baseApiURL}/${this.endPoint}/recipes`);
    }

    updatePassword(id: string, newPassword: any): Observable<any> {
        return this.http.put<any>(`${this.baseApiURL}/${this.endPoint}/password/${id}`, newPassword);
    }
}
