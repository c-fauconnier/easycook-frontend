import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';

@Component({
    selector: 'ec-recipe-element',
    templateUrl: './recipe-element.component.html',
    styleUrls: ['./recipe-element.component.scss'],
})
export class RecipeElementComponent {
    @Input() recipe: Recipe;

    constructor(private route: Router) {}

    goToRecipePage(): void {
        this.route.navigate([`recipes/${this.recipe.id}`]);
    }
}
