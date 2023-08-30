import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { ProfileService } from '../profile.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FavoriteRecipes } from 'src/app/shared/interfaces/favorite-recipes.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { RecipesService } from 'src/app/recipe/recipes.service';

@Component({
    selector: 'ec-profile-recipes',
    templateUrl: './profile-recipes.component.html',
    styleUrls: ['./profile-recipes.component.scss'],
})
export class ProfileRecipesComponent implements OnInit {
    recipes: Recipe[];
    userId: string = this.auth.user.id;

    constructor(
        private service: ProfileService,
        private auth: AuthService,
        private toastr: ToastrService,
        private recipesService: RecipesService
    ) {}

    ngOnInit(): void {
        this.service.getUserRecipes().subscribe({
            next: (res: Recipe[]) => {
                this.recipes = res;
            },
        });
    }

    deleteRecipe(recipeId: string) {
        const userConfirm = confirm('Voulez-vous supprimer cette recette ? Cette action est irréversible');
        if (userConfirm) {
            this.recipesService
                .delete(recipeId as string)
                .pipe(
                    switchMap((res) => {
                        this.toastr.success('Recette supprimée');
                        return this.service.getUserRecipes();
                    })
                )
                .subscribe({
                    next: (res: Recipe[]) => {
                        this.recipes = res;
                    },
                });
        }
    }
}
