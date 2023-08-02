import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type InputType = 'text' | 'password' | 'email' | 'number' | 'textarea' | 'time';

@Component({
    selector: 'ec-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent {
    @Input() type: InputType = 'text';
    @Input() placeholder: string = 'Remplir...';
    @Output() valueChange: EventEmitter<string> = new EventEmitter();

    value: string = '';

    constructor() {}

    onValueChange(value: string): void {
        this.valueChange.emit(value);
    }
}
