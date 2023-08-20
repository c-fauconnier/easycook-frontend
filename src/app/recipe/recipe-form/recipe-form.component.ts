import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RecipesService } from '../recipes.service';
import { Upload } from 'src/app/shared/interfaces/upload.interface';

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
    recipeForm: FormGroup;
    errors: {};
    index: number;
    fileError: string;
    selectedFile: File | null;
    showContent: boolean = true;
    buttonText: string = 'Cacher les étapes';
    difficultyOptions = [
        { value: 1, label: 'Très facile' },
        { value: 2, label: 'Facile' },
        { value: 3, label: 'Moyen' },
        { value: 4, label: 'Difficile' },
        { value: 5, label: 'Très difficile' },
    ];

    toggleContent() {
        this.showContent = !this.showContent;
        this.buttonText = this.showContent ? 'Cacher les étapes' : 'Afficher les étapes';
    }

    constructor(private fb: FormBuilder, private service: RecipesService, private toastr: ToastrService) {}

    showCustomNotification() {
        this.toastr.success('Recette créée !', 'Succès', {
            positionClass: 'toast-center', // Définit la position au centre en haut
            timeOut: 3000, // Durée d'affichage de la notification en millisecondes (3 secondes dans cet exemple)
            progressBar: true, // Affiche une barre de progression
            progressAnimation: 'increasing', // Animation de la barre de progression
        });
    }

    ngOnInit(): void {
        this.index = 1;
        this.initForm();
    }

    initForm(): void {
        this.recipeForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            duration: [0, [Validators.required, Validators.min(1)]],
            difficulty: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
            media: [null],
            steps: this.fb.array([]),
        });
    }

    // Méthode pour ajouter une étape au FormArray
    addStep() {
        const stepsArray = this.recipeForm.get('steps') as FormArray;
        const stepFormGroup = this.fb.group({
            index: [this.index],
            explanation: ['', Validators.required],
            title: ['', Validators.required],
        });
        stepsArray.push(stepFormGroup);
    }

    // Méthode pour supprimer une étape spécifique du FormArray
    removeStep(index: number) {
        const stepsArray = this.recipeForm.get('steps') as FormArray;
        stepsArray.removeAt(index);

        // Réorganiser les index des étapes restantes
        for (let i = 0; i < stepsArray.length; i++) {
            stepsArray
                .at(i)
                .get('index')
                ?.setValue(i + 1);
        }
    }

    // Méthode pour supprimer toutes les étapes du FormArray
    removeAllSteps() {
        (this.recipeForm.get('steps') as FormArray).clear();
    }

    getStepsControls() {
        return (this.recipeForm.get('steps') as FormArray).controls;
    }

    updateStep(updatedStep: FormGroup, index: number) {
        const stepsArray = this.recipeForm.get('steps') as FormArray;
        const stepControl = stepsArray.at(index);
        stepControl.patchValue(updatedStep.value);
    }

    // Lorsque le fichier est modifié
    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
            const allowedExtensions = ['.png', '.jpeg', '.jpg'];
            const fileExtension = this.selectedFile.name.split('.').pop()!.toLowerCase();

            if (allowedExtensions.includes('.' + fileExtension)) {
                // Le fichier a une extension autorisée, vous pouvez maintenant effectuer des actions
                // comme télécharger le fichier, valider le formulaire, etc.
            } else {
                // Le fichier a une extension non autorisée, affichage de message d'erreur
                event.target.value = '';
                this.fileError = 'Extension de fichier non autorisée.';
            }
        }
    }

    async onSubmit(): Promise<void> {
        if (this.recipeForm.valid) {
            let recipe = this.recipeForm.value;
            const formData = new FormData();
            if (this.selectedFile) {
                formData.append('media', this.selectedFile);
                this.service.uploadImage(formData, 'recipes').subscribe({
                    next: (res: Upload) => {
                        console.log(res.url);
                        recipe.media = res;
                    },
                });
                // this.service.addRecipe(recipe).subscribe({
                //     next: (res: boolean){
                //         console.log(res);

                //     }
                // });
            }

            // this.service.addRecipe(recipe).subscribe({
            //     next: (res: Recipe) => {
            //         this.showCustomNotification();
            //         location.reload();
            //         return;
            //     },
            //     error: (err: any) => {
            //         console.log(err.error.errors);
            //         this.errors = err.error.errors[0].message;
            //         return;
            //     },
            // });
        }
    }
}
