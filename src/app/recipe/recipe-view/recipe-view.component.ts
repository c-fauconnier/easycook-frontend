import { Component } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ec-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent {
    recipes: Recipe[] = [];

    constructor(private service: RecipesService, private auth: AuthService) {}

    isConnected: boolean = false;
    isAdmin: boolean = this.auth.isAdmin();
    url: string = '/recipe/form';
    text: string = 'Créer une recette';

    ngOnInit(): void {
        // Calling auth service to know the connection state
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
        // If we are connected then we call the get API to obtain our Lecture[]
        // if (this.isConnected) {
        //     this.service.getAll().subscribe({
        //         next: (res: Recipe[]) => {
        //             this.recipes = res;
        //         },
        //     });
        // }
    }
}
