import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'ec-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
    recipe: Recipe = {} as Recipe;
    isConnected: boolean = false;
    isFavorite: boolean = false;
    recipeId: string;
    isLoading: boolean = false;
    constructor(private service: RecipesService, private route: ActivatedRoute, private auth: AuthService, private toastr: ToastrService) {
        this.recipeId = route.snapshot.params['id'];
        service
            .get(this.recipeId)
            .pipe(
                switchMap((recipe: Recipe) => {
                    this.recipe = recipe;
                    return service.isMyFavorite(this.recipeId);
                })
            )
            .subscribe({
                next: (isfav: boolean) => {
                    this.isFavorite = isfav;
                },
            });
    }

    ngOnInit(): void {
        if (this.auth.user) {
            this.isConnected = true;
        }
    }

    addToFavorites() {
        this.isLoading = true;
        this.service.addToFavorites(this.recipeId).subscribe({
            next: (res) => {
                this.isFavorite = !this.isFavorite;
                this.toastr.success('Recette ajoutée aux favoris');
                this.isLoading = false;
            },
        });
    }

    deleteFromMyFavorites() {
        this.isLoading = true;
        this.service.deleteFromMyFavorites(this.recipeId).subscribe({
            next: (res) => {
                this.isFavorite = !this.isFavorite;
                this.toastr.success('Recette retirée des favoris');
                this.isLoading = false;
            },
        });
    }
}
