import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accountSettings',
  templateUrl: './accountSettings.component.html',
  styleUrls: ['./accountSettings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.checkCurrentTheme();
  }


  changeTheme(theme:string){
    this.settingsService.changeTheme(theme);
  }


}
