import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecipesService } from 'src/app/recipe/recipes.service';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';

@Component({
    selector: 'ec-recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent {
    _recipes: Recipe[] = [];
    shallowRecipes: Recipe[] = [];
    @Input() set recipes(recipes: Recipe[]) {
        this._recipes = recipes;
        this.shallowRecipes = recipes;
    }
    @Output() actionOnRecipe: EventEmitter<'validation' | 'delete'> = new EventEmitter();
    filteredRecipes: Recipe[] = [];
    onlyValidedRecipes: 'all' | 'valid' | 'unvalid' = 'all';
    showDialogBox: boolean = false;
    dialogText: string = '';
    recipeToValidate: Recipe = {} as Recipe;
    recipeToDelete: Recipe = {} as Recipe;

    constructor(private router: Router, private service: RecipesService, private toastr: ToastrService) {}

    onValidationChange(valid: 'all' | 'valid' | 'unvalid'): void {
        switch (valid) {
            case 'all':
                this._recipes = this.shallowRecipes;
                break;
            case 'valid':
                this._recipes = this.shallowRecipes;

                this._recipes = this._recipes.filter((recipe) => recipe.isValid);
                break;

            case 'unvalid':
                this._recipes = this.shallowRecipes;

                this._recipes = this._recipes.filter((recipe) => !recipe.isValid);
                break;
        }
    }

    goToRecipe(recipeId: string): void {
        this.router.navigateByUrl(`/recipes/selected/${recipeId}`);
    }

    onValidateRecipe(recipe: Recipe): void {
        this.showDialogBox = true;
        this.dialogText = `Voulez-vous valider cette recette ? (${recipe.title})`;
        this.recipeToValidate = recipe;
    }

    onDeleteRecipe(recipe: Recipe): void {
        this.showDialogBox = true;
        this.dialogText = `Voulez-vous supprimer cette recette ? (${recipe.title})`;
        this.recipeToDelete = recipe;
    }

    confirmValidation(): void {
        this.service.update(this.recipeToValidate.id, { isValid: true }).subscribe({
            next: () => {
                this.showDialogBox = false;
                this.dialogText = '';
                this.onlyValidedRecipes = 'all';
                this.recipeToValidate = {} as Recipe;
                this.actionOnRecipe.emit('validation');
                this.toastr.success('Recette validée !');
            },
        });
    }

    confirmDelete(): void {
        this.service.delete(this.recipeToDelete.id).subscribe({
            next: () => {
                this.showDialogBox = false;
                this.dialogText = '';
                this.onlyValidedRecipes = 'all';
                this.recipeToDelete = {} as Recipe;
                this.actionOnRecipe.emit('delete');
                this.toastr.success('Recette supprimée ! ');
            },
        });
    }
}
