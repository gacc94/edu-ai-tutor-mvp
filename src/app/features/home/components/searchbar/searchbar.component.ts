import { Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss'],
    imports: [IonSearchbar],
})
export class SearchbarComponent {
    onInput(event: IonSearchbar): void {
        console.log(event.value);
    }
}
