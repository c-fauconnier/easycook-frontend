import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ec-button-create',
    templateUrl: './button-create.component.html',
    styleUrls: ['./button-create.component.scss'],
})
export class ButtonCreateComponent {
    @Input() text: string;
    @Input() url: string;

    constructor(private router: Router) {}

    formRedirect(url: string) {
        this.router.navigateByUrl(url);
    }
}
