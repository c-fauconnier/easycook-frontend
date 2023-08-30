import { Comment } from './comment.interface';
import { RecipeIngredient } from './recipe-ingredient.interface';
import { Step } from './step.interface';
import { User } from './user.interface';

export interface Recipe {
    id: string;
    title: string;
    description: string;
    difficulty: number;
    likes: number | null;
    media: string;
    isValid: boolean; // recette approuvée par l'admin
    duration: number;
    user?: User;
    steps: Step[];
    ingredients: RecipeIngredient[];
    comments?: Comment[];
    createdAt?: Date | null;
}
