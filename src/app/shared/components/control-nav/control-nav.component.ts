import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ec-control-nav',
    templateUrl: './control-nav.component.html',
    styleUrls: ['./control-nav.component.scss'],
})
export class ControlNavComponent {
    @Input() totalPages: number;
    @Input() currentPage: number;
    @Output() onPreviousClick: EventEmitter<void> = new EventEmitter();
    @Output() onNextClick: EventEmitter<void> = new EventEmitter();
    @Output() onInputValidate: EventEmitter<number> = new EventEmitter();

    Previous() {
        this.onPreviousClick.emit();
    }

    Next() {
        this.onNextClick.emit();
    }

    handleInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        let enteredValue = parseInt(inputElement.value, 10);

        // Vérifier si la valeur est négative ou supérieure à totalPages
        if (enteredValue < 1 || isNaN(enteredValue)) {
            enteredValue = 1; // Réinitialiser à 1 si négatif ou non numérique
        } else if (enteredValue > this.totalPages) {
            enteredValue = this.totalPages; // Réinitialiser à totalPages si supérieur
        }

        inputElement.value = enteredValue.toString();
    }

    validateAndNavigate(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        let enteredValue = parseInt(inputElement.value, 10);

        if (!isNaN(enteredValue) && enteredValue >= 1) {
            // Faites quelque chose avec le numéro de page (par exemple, navigation)
            this.onInputValidate.emit(enteredValue);
        }
    }
}
