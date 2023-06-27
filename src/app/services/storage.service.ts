import { seed } from './../../utils/seed';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Practice } from '../models/practice';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private refresh$ = new Subject<void>();
  seedarr = seed

  get refresh() {
    return this.refresh$;
  }

  constructor() { }

  async seed() {
    const emptyHistory: Practice[] = [];
    await Preferences.set({key: 'practices', value: JSON.stringify(emptyHistory)});
    console.log('eliminando datos...');
    const seed: Practice[] = this.seedarr;
    await Preferences.set({key: 'practices', value: JSON.stringify(seed)});  
    console.log('semilla lanzada con éxito'); 
  }

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
