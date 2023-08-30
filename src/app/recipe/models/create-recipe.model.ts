import { RecipeIngredient } from 'src/app/shared/interfaces/recipe-ingredient.interface';
import { Step } from './step.model';
import { Comment } from 'src/app/shared/interfaces/comment.interface';

export class CreateRecipe {
    title: string;
    description: string;
    difficulty: number;
    likes: number | null;
    media: string;
    isValid: boolean;
    duration: number;
    steps: Step[];
    ingredients: RecipeIngredient[];
    comments: Comment[];
    constructor() {
        this.title = '';
        this.description = '';
        this.difficulty = 1;
        this.likes = null;
        this.isValid = false;
        this.duration = 0;
        this.steps = [];
        this.ingredients = [];
        this.comments = [];
    }
}
