import { Component, Input } from '@angular/core';
import { CustomError } from '../../interfaces/error.interface';

@Component({
    selector: 'ec-form-error',
    templateUrl: './form-error.component.html',
    styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent {
    @Input() error: CustomError;

    // getError(key: string): CustomError {
    //     return false;
    // }
}
