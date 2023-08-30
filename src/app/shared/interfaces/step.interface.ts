import { Recipe } from './recipe.interface';

export interface Step {
    number: number;
    explanation: string;
    title: string;
    index: number;
    duration: number;
    recipe: Recipe;
}
