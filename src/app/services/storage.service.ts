import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Practice } from '../models/practice';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private refresh$ = new Subject<void>();

  get refresh() {
    return this.refresh$;
  }

  constructor() { }

  async getPractices() {
    const history = await Preferences.get({key: 'practices'});

    if (!history.value) {
      const defaultHistory: Practice[] = [];
      await Preferences.set({key: 'practices', value: JSON.stringify(defaultHistory)});
    }
    return JSON.parse(history.value || '[]');
  }

  async addPractice(practice: Practice) {
    const history = await this.getPractices();
    history.unshift(practice)
    console.log(history);
    await Preferences.set({key: 'practices', value: JSON.stringify(history)})
      .then(() => this.refresh$.next());
  }

  async deletePractice(practice: Practice) {
    const history = await this.getPractices();
    const index = history.findIndex((item: Practice) => item.id === practice.id);
    history.splice(index, 1);
    await Preferences.set({key: 'practices', value: JSON.stringify(history)})
      .then(() => this.refresh$.next());
  }
}
