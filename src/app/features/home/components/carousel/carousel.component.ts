import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { SwiperOptions } from 'swiper/types';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselComponent {
    breakpoints = signal<{ [key: number]: SwiperOptions }>({
        0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        // 480: {
        //     slidesPerView: 2,
        // },
        640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
        },
    });
}
