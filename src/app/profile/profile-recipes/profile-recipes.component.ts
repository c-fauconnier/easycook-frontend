import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { ProfileService } from '../profile.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
    selector: 'ec-profile-recipes',
    templateUrl: './profile-recipes.component.html',
    styleUrls: ['./profile-recipes.component.scss'],
})
export class ProfileRecipesComponent implements OnInit {
    constructor(private service: ProfileService) {}
    //@Input() recipes: Recipe[] = []; // Tableau de recettes reçu depuis le parent
    user: User = {} as User;
    recipes: Recipe[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalPages: number;

    ngOnInit(): void {
        this.service.userData$.subscribe((user) => {
            this.user = user!;
            this.recipes = user!.recipes;
        });
        this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
    }

    getPaginatedRecipes(): Recipe[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.recipes.slice(startIndex, endIndex);
    }

    onPageChange(pageNumber: number): void {
        this.currentPage = pageNumber;
    }

    totalPagesArray(): number[] {
        return Array.from({ length: this.totalPages }, (_, index) => index + 1);
    }
}
