import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { StorageService } from './services/storage/storage.service';
import { CommonModule } from '@angular/common';
import { TutorialService } from './services/tutorial/tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent implements OnInit {

  public theme: string = 'bsr-original';

  constructor(
    private storageService: StorageService, 
    private tutorialService: TutorialService
  ) {}

  ngOnInit() {
    this.getTheme();
    this.tutorialService.shouldShowTutorial();
  }

  async getTheme() {
    const theme = await this.storageService.getTheme();
    this.theme = theme.value;
  }
}
