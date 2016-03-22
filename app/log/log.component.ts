import {Component, OnInit} from 'angular2/core';
import {Log} from './log';
import {Settings} from '../settings/settings';
import {RESTService} from '../service/rest.service';
import {CommunicationService} from '../service/communication.service';

@Component({
  selector: 'web-cli-log',
  templateUrl: 'app/log/log.html'
})
export class WebCliLogComponent implements OnInit {
  log: Log[];
  refreshRunning: boolean;
  timeout: number;
  settings: Settings;

  constructor(private _restService: RESTService,
              private _comunicationService: CommunicationService){}

  ngOnInit() {
    this.settings = new Settings(1000,5000,50,true);
    this._comunicationService.refreshRunning.subscribe(
      refreshRunning => {
        this.refreshRunning = refreshRunning;
        clearTimeout(this.timeout);
        if (refreshRunning) {
          this.startGetLog();
        }
      }
    );
    this._comunicationService.settings.subscribe(
      settings => this.settings = settings
    );
  }

  startGetLog() {
    let logComp = this;
    if (this.refreshRunning) {
      this.timeout = setTimeout(function() {
        logComp.getLog();
        logComp.startGetLog();
      },
        this.settings.logRefreshRate
      );
    }
  }

  getLog() {
    this._restService.getLog().subscribe(
      log => {
        if (log != undefined && log.length > 0) {
          if (this.log != undefined) {
            this.log.push.apply(this.log, log);
            this.log = this.log.splice(this.settings.historySize * -1, this.settings.historySize);
          }
          else {
            this.log = log;
          }
        }
      },
      error =>  console.log(<any>error));
  }

  public clearLog() {
    this.log.splice(0, this.log.length);
  }

  ngAfterViewChecked() {
    this.scrollLog()
  }

  scrollLog() {
    if (this.settings.autoscroll) {
        var elem = document.getElementsByClassName('web-cli-log');
        elem[0].scrollTop = elem[0].scrollHeight;
    }
  }
}
