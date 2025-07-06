import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PlanPremiunComponent } from './components/plan-premiun/plan-premiun.component';
import { ToolsComponent } from './components/tools/tools.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

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
    title = 'EduAiTutor';
}
