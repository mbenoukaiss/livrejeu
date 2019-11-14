import {Component, OnInit} from '@angular/core';
import {Page} from '../save';
import {SaveService} from '../save.service';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

    page: Page;

    constructor(private ps: SaveService, private router: Router, private route: ActivatedRoute) {
        this.page = {} as Page;
    }

    ngOnInit() {
        this.ps.save.subscribe((save) => {
            this.page = save.pages[+this.route.snapshot.paramMap.get('page')];
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.ps.save.subscribe((save) => {
                    this.page = save.pages[+this.route.snapshot.paramMap.get('page')];
                });
            });
    }

}
