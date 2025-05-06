import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, linkedSignal, signal } from '@angular/core';
import { IonIcon, IonContent, IonFooter, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PlanPremiunComponent } from './components/plan-premiun/plan-premiun.component';
import { ToolsComponent } from './components/tools/tools.component';
import { DragonBallService } from 'src/app/shared/services/dragon-ball.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [
        IonContent,
        HeaderComponent,
        FooterComponent,
        SearchbarComponent,
        CarouselComponent,
        PlanPremiunComponent,
        ToolsComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class HomePage {
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
