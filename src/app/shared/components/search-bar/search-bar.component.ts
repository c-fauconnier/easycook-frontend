import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Output() result: EventEmitter<{ input: any; items: T[] }> = new EventEmitter<{ input: any; items: T[] }>();
    @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>(false);
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
                    this.isLoading.emit(true);
                    return event;
                }),
                debounceTime(500),
                distinctUntilChanged(),
                switchMap((text: string) => {
                    return this.service.getByKeyName(this.key, text);
                })
            )
            .subscribe((res: T[]) => {
                this.isLoading.emit(false);
                this.result.emit({ input: this.value, items: res });
            });
    }

    onResetValue(): void {
        this.value = '';
        this.result.emit({ input: '', items: [] });
    }
}
