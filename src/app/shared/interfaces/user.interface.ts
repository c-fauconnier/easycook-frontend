import { Role } from '../enums/role.enum';
import { Comment } from './comment.interface';
import { Lecture } from './lecture.interface';
import { Recipe } from './recipe.interface';
import { Restriction } from './restriction.interface';

export interface User {
    name: string;
    surname: string;
    nickname: string;
    email: string;
    createdAt: Date;
    avatar?: string;
    role: Role;
    recipes: Recipe[];
    lectures: Lecture[];
    comments: Comment[];
    restrictions: Restriction[];
}
