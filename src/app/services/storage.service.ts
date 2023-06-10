import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Practice } from '../models/practice';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

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
  }
}
