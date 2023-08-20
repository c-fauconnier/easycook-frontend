import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Step } from '../models/step.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'ec-step-form',
    templateUrl: './step-form.component.html',
    styleUrls: ['./step-form.component.scss'],
})
export class StepFormComponent implements OnInit {
    // _step: Step = new Step();

    @Input() index: number;
    @Input() step: Step; // Étape passée en tant que propriété d'entrée
    @Output() deleteStep: EventEmitter<void> = new EventEmitter<void>();
    @Output() stepChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>(); // Nouvel EventEmitter

    stepForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.stepForm = this.fb.group({
            index: [this.index],
            explanation: [this.step.explanation, Validators.required],
            title: [this.step.title, Validators.required],
        });
        // Utiliser this.formGroup pour accéder aux contrôles spécifiques de l'étape
        this.stepForm.valueChanges.subscribe(() => {
            this.stepChange.emit(this.stepForm);
        });
    }

    onDelete(): void {
        this.deleteStep.emit();
    }
}
