import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, linkedSignal, signal } from '@angular/core';
import { IonIcon, IonContent, IonFooter, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { DragonBallService } from '../../shared/services/dragon-ball.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [IonIcon, IonContent, HeaderComponent, FooterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
