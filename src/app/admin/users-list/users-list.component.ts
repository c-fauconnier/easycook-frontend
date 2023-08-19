import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
    selector: 'ec-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
    @Input() users: User[] = [];
}
