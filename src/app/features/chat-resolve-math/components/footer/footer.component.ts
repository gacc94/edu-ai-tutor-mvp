import { CUSTOM_ELEMENTS_SCHEMA, Component, output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonFooter, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
    selector: 'app-footer',
    template: `
        <ion-footer class="footer">
            <div class="footer__wrapper">
                <ion-button>
                    <ion-icon slot="icon-only" name="camera-outline"></ion-icon>
                </ion-button>
                <ion-input
                    class="footer__input"
                    placeholder="Write To Send Message"
                    [formControl]="control"
                ></ion-input>
                <ion-button type="button" (click)="sendMessage()" [disabled]="control.invalid">
                    <ion-icon slot="icon-only" name="paper-plane-outline"></ion-icon>
                </ion-button>
            </div>
        </ion-footer>
    `,
    styleUrls: ['./footer.component.scss'],
    imports: [IonFooter, IonInput, IonButton, IonIcon, ReactiveFormsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
    control = this.formBuilder.control('', { nonNullable: true, validators: [Validators.required] });

    constructor(private formBuilder: FormBuilder) {}

    message = output<string>({
        alias: 'onSendMessage',
    });

    sendMessage() {
        if (!this.control) return;
        const message = this.control.value.trim();
        this.message.emit(message);
        this.control.reset();
    }
}
