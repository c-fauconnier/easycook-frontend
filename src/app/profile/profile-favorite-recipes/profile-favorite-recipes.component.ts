import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteRecipes } from 'src/app/shared/interfaces/favorite-recipes.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { RecipesService } from 'src/app/recipe/recipes.service';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';

@Component({
    selector: 'ec-profile-favorite-recipes',
    templateUrl: './profile-favorite-recipes.component.html',
    styleUrls: ['./profile-favorite-recipes.component.scss'],
})
export class ProfileFavoriteRecipesComponent implements OnInit {
    favoriteRecipes: FavoriteRecipes[];
    userId: string = this.auth.user.id;

    constructor(
        private service: ProfileService,
        private auth: AuthService,
        private recipesService: RecipesService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.service.getUserFavoriteRecipes().subscribe({
            next: (res: FavoriteRecipes[]) => {
                this.favoriteRecipes = res;
            },
        });
    }

    deleteFromMyFavorites(recipeId: string) {
        const userConfirm = confirm('Voulez-vous retirer cette recette de vos favoris ?');
        if (userConfirm) {
            this.recipesService
                .deleteFromMyFavorites(recipeId)
                .pipe(
                    switchMap((res) => {
                        this.toastr.success('Recette retirée des favoris');
                        return this.service.getUserFavoriteRecipes();
                    })
                )
                .subscribe({
                    next: (res: FavoriteRecipes[]) => {
                        this.favoriteRecipes = res;
                    },
                });
        }
    }
}
