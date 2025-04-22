import { HttpParams, httpResource } from '@angular/common/http';
import { Component, inject, linkedSignal, signal } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
} from '@ionic/angular/standalone';
import { Character, DBResponse } from './dragon-ball.interface';
import { JsonPipe } from '@angular/common';
import { DragonBallService } from './dragon-ball.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [
        IonIcon,
        IonButton,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        JsonPipe,
    ],
})
export class HomePage {
    #dbService = inject(DragonBallService);

    $id = signal<number>(1);

    charactersRes = this.#dbService.getOne(this.$id);

    character = linkedSignal(() => this.charactersRes);

    nextCharacter() {
        this.$id.update((num) => num + 1);
    }

    previusCharacter() {
        if (this.$id() === 0) return;
        this.$id.update((num) => num - 1);
    }
}
