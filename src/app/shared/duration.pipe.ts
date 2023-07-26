import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'duration',
})
export class DurationPipe implements PipeTransform {
    transform(time: number, ...args: unknown[]): string {
        let transformedTime: string = '';
        const hours = Math.floor(time / 60);
        const minutes = time % 60;

        if (hours === 0 && minutes > 0) return `${minutes} minutes`;
        if (minutes === 0 && hours > 0) return `${hours} heures`;

        return `${hours}h ${minutes > 10 ? `0${minutes}` : `${minutes}`}m`;
    }
}
