import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TutorialComponent } from 'src/app/pages/practice/tutorial/tutorial.component';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  public tutorial: string = 'true';

  constructor(
    private storageService: StorageService, 
    private modalController: ModalController
  ) {}

  async shouldShowTutorial() {
    const tutorial = await this.storageService.getTutorialSettings();
    if (tutorial.value) {
      this.tutorial = tutorial.value; 
    }
     
    if(this.tutorial === 'true') {
      this.showTutorial();
    }
  }

  async showTutorial() {
    const tutorial = await this.modalController.create({
      component: TutorialComponent
    })
    await tutorial.present();
  }
}
