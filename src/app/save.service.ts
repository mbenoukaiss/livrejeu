import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Save} from './save';
import {first} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SaveService {
    public save: ReplaySubject<Save>;
    public inventory: ReplaySubject<string[]>;

    constructor(private http: HttpClient) {
        this.save = new ReplaySubject(1);
        this.inventory = new ReplaySubject(1);

        this.initialize();
    }

    private initialize() {
        this.http.get<Save>('/assets/save.json').subscribe((save) => {
            const inventory = localStorage.getItem('inventory');
            if (inventory != null) {
                save.inventory = JSON.parse(inventory);
            }

            this.save.next(save);
            this.inventory.next(save.inventory);
        });
    }

    public take(item: string) {
        this.save.pipe(first()).subscribe((save) => {
            save.inventory.push(item);
            localStorage.setItem('inventory', JSON.stringify(save.inventory));

            this.save.next(save);
            this.inventory.next(save.inventory);
        });
    }

    public drop(item: string) {
        this.save.pipe(first()).subscribe((save) => {
            save.inventory.splice(save.inventory.indexOf(item), 1);
            localStorage.setItem('inventory', JSON.stringify(save.inventory));
        });
    }

    public clear() {
        localStorage.removeItem('inventory');
        this.initialize();
    }

}
