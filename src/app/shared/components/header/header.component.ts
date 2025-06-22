import {
    Component,
    input,
    CUSTOM_ELEMENTS_SCHEMA,
    ChangeDetectionStrategy,
    Inject,
    signal,
    computed,
} from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonImg,
    IonButton,
    IonIcon,
} from '@ionic/angular/standalone';
import { IStateRegister } from '@shared/storage/interfaces/state-storage.interface';
import { STATE_REGISTER_TOKEN } from '@shared/storage/providers/storage.provider';
import { Router } from '@angular/router';
import { CreditsCounterComponent } from '../credits-counter/credits-counter.component';
import { AuthService } from '@core/auth/application/services/auth.service';
import { USER_STATE } from '@core/auth/application/states/states';
import { IStateStorage } from '@shared/storage/interfaces/state-storage.interface';
import { UserState } from '@core/auth/application/states/interfaces/user.state';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    template: `
        <ion-header class="header">
            <ion-toolbar class="header__toolbar">
                @if (showBackButton()) {
                <ion-buttons slot="start">
                    <ion-back-button class="header__back-button" defaultHref="/home"></ion-back-button>
                </ion-buttons>
                }
                <div class="header__wrapper">
                    <div class="header__brand">
                        <ion-img src="assets/eduaitutor-bot.png" alt="eduai-tutor-bot"></ion-img>
                        <ion-title class="header__title">{{ title() }}</ion-title>
                    </div>
                    @if (showCredits() && currentUser()) {
                    <div class="header__credits">
                        <app-credits-counter></app-credits-counter>
                    </div>
                    } @if (showUserInfo() && currentUser()) {
                    <div class="header__user">
                        <span class="header__user-name">{{ currentUser()?.displayName }}</span>
                        <ion-button fill="clear" size="small" (click)="logout()">
                            <ion-icon name="log-out-outline" slot="icon-only"></ion-icon>
                        </ion-button>
                    </div>
                    }
                </div>
            </ion-toolbar>
        </ion-header>
    `,
    styleUrls: ['./header.component.scss'],
    imports: [
        IonBackButton,
        IonButtons,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonImg,
        IonButton,
        IonIcon,
        CreditsCounterComponent,
        CommonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    title = input.required<string>();
    showBackButton = input.required<boolean>({ alias: 'show-back-button' });
    showCredits = input<boolean>(false, { alias: 'show-credits' });
    showUserInfo = input<boolean>(false, { alias: 'show-user-info' });

    private readonly _userState = this._userStateStorage.$state;
    currentUser = computed(() => this._userState());

    constructor(
        @Inject(STATE_REGISTER_TOKEN) private register: IStateRegister,
        @Inject(USER_STATE) private _userStateStorage: IStateStorage<UserState>,
        private router: Router,
        private authService: AuthService
    ) {}

    async logout() {
        try {
            await this.authService.signOut();
            await this.register.clearAll();
            this.router.navigate(['/auth/login']);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
}
