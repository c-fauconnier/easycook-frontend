import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'ec-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
    contactForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

    ngOnInit(): void {
        this.contactForm = this.formBuilder.group({
            subject: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
        });
    }

    onSubmit() {
        if (this.contactForm.valid) {
            // Envoyer les données du formulaire au support
            this.auth.sendContactEmail(this.contactForm.value).subscribe({
                next: (res: boolean) => {
                    // Réinitialiser le formulaire après l'envoi
                    this.contactForm.reset();
                },
            });
        }
    }
}
