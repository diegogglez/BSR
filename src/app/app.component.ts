import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './pages/practice/tutorial/tutorial.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent implements OnInit {

  public theme: string = 'bsr-original';
  public tutorial: string = 'true';

  constructor(private storageService: StorageService, private modalController: ModalController) {}

  ngOnInit() {
    this.getTheme();
    this.shouldShowTutorial();
  }

  async getTheme() {
    const theme = await this.storageService.getTheme();
    this.theme = theme.value;   
    console.log(theme);
    
  }

  async shouldShowTutorial() {
    const tutorial = await this.storageService.getTutorialSettings();
    if (tutorial.value) {
      this.tutorial = tutorial.value; 
    }
    console.log(this.tutorial);
     
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
