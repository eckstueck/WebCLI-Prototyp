import {Injectable} from 'angular2/core';
import {Settings} from '../settings/settings';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class CommunicationService {
  private _currentCommand = new Subject<string>();
  private _refreshRunning = new Subject<boolean>();
  private _settings = new Subject<Settings>();

  currentCommand = this._currentCommand.asObservable();
  refreshRunning = this._refreshRunning.asObservable();
  settings = this._settings.asObservable();

  setCurrentCommand(command: string) {
    this._currentCommand.next(command);
  }

  setRefreshRunning(running: boolean) {
    this._refreshRunning.next(running);
  }

  setSettings(setting: Settings) {
    this._settings.next(setting);
  }
}
