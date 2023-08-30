import { Role } from '../enums/role.enum';
import { Comment } from './comment.interface';
import { FavoriteLectures } from './favorite-lectures.interface';
import { FavoriteRecipes } from './favorite-recipes.interface';
import { Lecture } from './lecture.interface';
import { Recipe } from './recipe.interface';
import { Restriction } from './restriction.interface';

export interface User {
    id?: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    createdAt: Date;
    avatar?: string;
    isEmailVerified: boolean;
    role: Role;
    recipes: Recipe[];
    lectures: Lecture[];
    comments: Comment[];
    restrictions: Restriction[];
    favoriteRecipes: FavoriteRecipes[];
    favoriteLectures: FavoriteLectures[];
}
