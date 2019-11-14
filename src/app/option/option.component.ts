import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Option} from '../save';
import {SaveService} from '../save.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.css']
})
export class OptionComponent {

    @Input() option: Option;

    constructor(private ss: SaveService, private snackbar: MatSnackBar, private router: Router) {
    }

    proceed() {
        this.ss.save.pipe(first()).subscribe(save => {
            const next = save.pages[this.option.page];

            let authorized = true;
            for (const item of next.requirements) {
                authorized = authorized && save.inventory.includes(item);
            }

            if (authorized) {
                this.router.navigate(['/page/', this.option.page]);
            } else {
                const bar = this.snackbar.open('You need ' + next.requirements.join(', ') + ' to do this action!');

                setTimeout(() => {
                    bar.dismiss();
                }, 3000);
            }
        });
    }

}
