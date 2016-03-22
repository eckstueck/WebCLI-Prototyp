import {Component} from 'angular2/core';
import {CommunicationService} from '../service/communication.service';
import {Settings} from './settings';

@Component({
  selector: 'web-cli-settings',
  templateUrl: 'app/settings/settings.html'
})
export class WebCliSettingsComponent {
  settings: Settings;

  constructor(private _communicationService: CommunicationService){}

  ngOnInit() {
    this.settings = new Settings(1000, 5000, 50, true);
    this._communicationService.setSettings(this.settings);
  }
}
