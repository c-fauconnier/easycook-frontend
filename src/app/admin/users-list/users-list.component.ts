import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { DecodedToken } from 'src/app/shared/interfaces/decoded-token.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/user/users.service';

@Component({
    selector: 'ec-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    @Input() users: User[] = [];
    @Output() userIsDeleted: EventEmitter<void> = new EventEmitter();

    // Correspond à l'utilisateur connecté
    connectedUser: DecodedToken = {} as DecodedToken;
    constructor(private service: UsersService, private authService: AuthService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.connectedUser = this.authService.user as DecodedToken;
    }

    showDialogBox: boolean = false;
    dialogText: string = '';
    userToDelete: User = {} as User;

    onDeleteUser(user: User) {
        this.showDialogBox = true;
        this.dialogText = `Voulez-vous supprimer cet utilisateur ? (${user.nickname})`;
        this.userToDelete = user;
    }

    confirmDelete() {
        this.service.delete(this.userToDelete.id as string).subscribe({
            next: (res) => {
                this.showDialogBox = false;
                this.userToDelete = {} as User;
                this.userIsDeleted.emit();
                this.toastr.success('Utilisateur supprimé !');
            },
        });
    }

    isConnectedUser(userID: any): boolean {
        return this.connectedUser.id !== userID.toString();
    }
}
