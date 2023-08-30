import { Component, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';

@Component({
    selector: 'ec-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent {
    @Input() recipes: Recipe[];
}
