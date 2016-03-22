import {Component, OnInit} from 'angular2/core';
import {RESTService} from '../service/rest.service';
import {CommunicationService} from '../service/communication.service';
import {Commands} from './commands';

@Component({
  selector: '[webcli-commands]',
  templateUrl: 'app/commands/commands.html',
})
export class WebCliCommandsComponent implements OnInit {
  commandList: Commands[];
  currentCommand: string;

  constructor(private _restService: RESTService,
              private _comunicationService: CommunicationService){}

  ngOnInit() {
    this._restService.getCommands().subscribe(
      commandList => this.commandList = commandList,
      error =>  console.log(<any>error)
    );
  }

  onSelect(command) {
    this._comunicationService.setCurrentCommand(command);
  }
}
