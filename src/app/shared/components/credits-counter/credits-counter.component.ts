import { Component, OnInit, inject, linkedSignal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { USER_STATE } from '@core/auth/infrastructure/providers/providers';

@Component({
    selector: 'app-credits-counter',
    template: ` <span>{{ $currentCredits() }}/{{ $totalCredits() }}</span> `,
    styleUrls: ['./credits-counter.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreditsCounterComponent implements OnInit {
    userState = inject(USER_STATE);

    $currentCredits = linkedSignal(() => this.userState.$state()?.credits.current);
    $totalCredits = linkedSignal(() => this.userState.$state()?.credits.max);

    constructor() {}

    ngOnInit() {}
}
