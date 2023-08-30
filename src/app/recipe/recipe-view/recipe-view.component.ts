import { Component } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { RecipesService } from '../recipes.service';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Index } from 'src/app/shared/interfaces/index.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'ec-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent {
    recipes: Recipe[] = [];
    filteredRecipes: Recipe[] = [];

    constructor(public service: RecipesService, private auth: AuthService, private route: ActivatedRoute, private router: Router) {}

    isConnected: boolean = false;
    isVerified: boolean = false;
    isAdmin: boolean = this.auth.isAdmin();
    isLoading: boolean = false;
    noResult: boolean = false;

    url: string = '/recipes/form';
    text: string = 'Créer une recette';

    totalPages: number;
    currentPage: number = 1; // Initialisée avec 1 par défaut
    limit: number = 9;

    ngOnInit(): void {
        // Calling auth service to know the connection state
        (this.auth as AuthService).isConnected$.subscribe({
            next: (isConnected: boolean) => {
                this.isConnected = isConnected;
            },
        });
        this.auth.isEmailVerified().subscribe({
            next: (res: boolean) => {
                this.isVerified = res;
            },
        });
        this.route.params.subscribe((params) => {
            const pageNumber = +params['index'];
            //this.currentPage = pageNumber;
            this.loadPage(pageNumber);
        });
    }

    // Charge la page indiquée
    loadPage(pageNumber: number): void {
        this.service.getByIndex(pageNumber, this.limit).subscribe({
            next: (response) => {
                this.recipes = response.items;
                this.totalPages = response.totalPages;
                this.currentPage = pageNumber;
            },
        });
    }

    previousPage() {
        this.currentPage--;
        this.router.navigateByUrl(`/recipes/${this.currentPage}`);
    }

    nextPage() {
        this.currentPage++;
        this.router.navigateByUrl(`/recipes/${this.currentPage}`);
    }

    inputPage(index: number) {
        this.currentPage = index;
        this.router.navigateByUrl(`/recipes/${this.currentPage}`);
    }

    onResultChange(researchedRecipes: { input: string; items: Recipe[] }) {
        if (!researchedRecipes.input || !researchedRecipes.input.length) {
            this.noResult = false;
            this.filteredRecipes = [];
            return;
        } else if (researchedRecipes.input && !researchedRecipes.items.length) {
            this.noResult = true;
        } else {
            this.noResult = false;
            this.filteredRecipes = researchedRecipes.items;
        }
    }

    onLoadingRecipesChange(loading: boolean): void {
        this.isLoading = loading;
    }
}
