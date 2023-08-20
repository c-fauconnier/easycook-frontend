import { Component, OnInit } from '@angular/core';
import { forkJoin, tap } from 'rxjs';
import { LecturesService } from 'src/app/lecture/lectures.service';
import { Lecture } from 'src/app/lecture/models/lecture.model';
import { RecipesService } from 'src/app/recipe/recipes.service';
import { Recipe } from 'src/app/shared/interfaces/recipe.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/user/users.service';

@Component({
    selector: 'ec-admin-pannel',
    templateUrl: './admin-pannel.component.html',
    styleUrls: ['./admin-pannel.component.scss'],
})
export class AdminPannelComponent implements OnInit {
    users: User[] = [];
    recipes: Recipe[] = [];
    lectures: Lecture[] = [];

    showUsersList: boolean = false;
    showRecipesList: boolean = false;
    showLecturesList: boolean = false;

    constructor(private usersService: UsersService, private recipesService: RecipesService, private lecturesService: LecturesService) {}

    ngOnInit(): void {
        forkJoin({
            users: this.usersService.getAll(),
            recipes: this.recipesService.getAll(),
            lectures: this.lecturesService.getAll(),
        }).subscribe({
            next: (res: { users: User[]; recipes: Recipe[]; lectures: Lecture[] }) => {
                this.users = res.users;
                this.recipes = res.recipes;
                this.lectures = res.lectures;
            },
        });
    }

    onSelectList(list: 'users' | 'recipes' | 'lectures'): void {
        switch (list) {
            case 'users':
                this.usersService.getAll().subscribe({
                    next: (users: User[]) => {
                        this.users = users;
                        this.showUsersList = true;
                        this.showRecipesList = false;
                        this.showLecturesList = false;
                    },
                });
                break;
            case 'recipes':
                this.recipesService.getAll().subscribe({
                    next: (recipes: Recipe[]) => {
                        this.recipes = recipes;
                        this.showRecipesList = true;
                        this.showUsersList = false;
                        this.showLecturesList = false;
                    },
                });

                break;
            case 'lectures':
                this.lecturesService.getAll().subscribe({
                    next: (lectures: Lecture[]) => {
                        this.lectures = lectures;
                        this.showUsersList = false;
                        this.showRecipesList = false;
                        this.showLecturesList = true;
                    },
                });

                break;
            default:
                this.showUsersList = true;
                break;
        }
    }

    onActionOnRecipe(action: 'validation' | 'delete'): void {
        this.recipesService.getAll().subscribe({
            next: (recipes: Recipe[]) => {
                this.recipes = recipes;
            },
        });
    }

    onDeletedUser(): void {
        this.usersService.getAll().subscribe({
            next: (users: User[]) => {
                this.users = users;
            },
        });
    }
}
