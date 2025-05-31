import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tools',
    template: `
        @let tools = [1,2,3];
        <section class="tools">
            <div class="tools__header">
                <h4 class="tools__title">Herramientas para ti</h4>
            </div>

            <div class="tools__grid">
                @for (item of tools; track $index) {
                <div class="card" [routerLink]="['/chat-resolve-math']">
                    <div class="card__header">
                        <div class="card__icon-wrapper">
                            <ion-icon name="create-outline" class="card__icon"></ion-icon>
                        </div>
                    </div>
                    <div class="card__content">
                        <h3 class="card__title">Writing Article</h3>
                        <p class="card__description">Practica con ejercicios interactivos</p>
                    </div>
                </div>
                }
            </div>
        </section>
    `,
    styleUrl: './tools.component.scss',
    imports: [IonIcon, RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToolsComponent {}
