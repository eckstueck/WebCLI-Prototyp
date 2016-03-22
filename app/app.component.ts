import {Component, ViewChild} from 'angular2/core';
import {WebCliCommandsComponent} from './commands/commands.component';
import {WebCliCommandInputComponent} from './command-input/command-input.component';
import {WebCliLogComponent} from './log/log.component';
import {WebCliSettingsComponent} from './settings/settings.component';
import {CommunicationService} from './service/communication.service';
import {RESTService} from './service/rest.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.html',
  directives: [WebCliCommandsComponent, WebCliCommandInputComponent, WebCliLogComponent, WebCliSettingsComponent],
  providers: [CommunicationService, RESTService]
})
export class AppComponent {
  title = 'MyCoRe Web CLI2';
  refreshRunning: boolean = true;
  @ViewChild(WebCliLogComponent)
  webCliLogComponent: WebCliLogComponent;

  constructor(private _communicationService: CommunicationService){}

  ngOnInit() {
    this._communicationService.setRefreshRunning(this.refreshRunning);
  }

  setRefresh(refresh: boolean){
    this.refreshRunning = refresh;
    this._communicationService.setRefreshRunning(refresh);
  }

  clearLog(){
    this.webCliLogComponent.clearLog();
  }
}
