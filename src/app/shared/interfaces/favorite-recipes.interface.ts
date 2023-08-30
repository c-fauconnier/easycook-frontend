import { Recipe } from './recipe.interface';

export interface FavoriteRecipes {
    id: number;
    deletedAt: Date | null;
    updatedAt: Date;
    createdAt: Date;
    recipe: Recipe;
}
