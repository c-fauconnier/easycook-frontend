import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject, auditTime, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { BaseService } from '../../services/base-http.services';

@Component({
    selector: 'ec-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent<T> implements OnInit {
    @Input() service: BaseService<T>;
    @Input() key: string = 'title';
    @Output() result: T[];
    search$ = new Subject();

    value: string = '';

    search(val: string) {
        this.search$.next(val);
    }
    constructor() {}
    ngOnInit(): void {
        this.search$
            .pipe(
                auditTime(200),
                map((event: any) => {
                    return event.target.value;
                }),
                debounceTime(1000),
                distinctUntilChanged(),
                switchMap((text: string) => {
                    return this.service.getByKeyName(this.key, text);
                })
            )
            .subscribe((res: T[]) => {
                console.log(res);
            });
    }
}
