import { Component, inject, linkedSignal, signal } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonFooter,
    IonButtons,
} from '@ionic/angular/standalone';
import { JsonPipe } from '@angular/common';
import { DragonBallService } from '../../shared/services/dragon-ball.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [IonIcon, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButtons],
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
