import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { Character, DBResponse } from '../interfaces/dragon-ball.interface';

@Injectable({
    providedIn: 'root',
})
export class DragonBallService {
    getAll() {
        return httpResource<DBResponse>(() => ({
            url: `https://dragonball-api.com/api/characters}`,
            method: 'GET',
        }));
    }

    getOne($id: Signal<number>) {
        return httpResource<Character>(() => ({
            url: `https://dragonball-api.com/api/characters/${$id()}`,
            method: 'GET',
        })).value();
    }
}
