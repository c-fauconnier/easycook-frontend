import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { LecturesService } from 'src/app/lecture/lectures.service';
import { DecodedToken } from 'src/app/shared/interfaces/decoded-token.interface';
import { Lecture } from 'src/app/shared/interfaces/lecture.interface';

@Component({
    selector: 'ec-lectures-list',
    templateUrl: './lectures-list.component.html',
    styleUrls: ['./lectures-list.component.scss'],
})
export class LecturesListComponent implements OnInit {
    @Input() lectures: Lecture[] = [];
    @Output() lectureIsDeleted: EventEmitter<void> = new EventEmitter();

    // Correspond à l'utilisateur connecté
    connectedUser: DecodedToken = {} as DecodedToken;
    constructor(
        private service: LecturesService,
        private authService: AuthService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.connectedUser = this.authService.user as DecodedToken;
    }

    showDialogBox: boolean = false;
    dialogText: string = '';
    lectureToDelete: Lecture = {} as Lecture;

    goToLecture(id: string): void {
        this.router.navigateByUrl(`/lectures/selected/${id}`);
    }

    onDeleteLecture(lecture: Lecture) {
        this.showDialogBox = true;
        this.dialogText = `Voulez-vous supprimer ce cours ? (${lecture.title})`;
        this.lectureToDelete = lecture;
    }

    confirmDelete() {
        this.service.delete(this.lectureToDelete.id).subscribe({
            next: (res) => {
                this.showDialogBox = false;
                this.lectureToDelete = {} as Lecture;
                this.lectureIsDeleted.emit();
                this.toastr.success('Cours supprimé !');
            },
        });
    }

    isConnectedUser(userID: any): boolean {
        return this.connectedUser.id !== userID.toString();
    }
}
