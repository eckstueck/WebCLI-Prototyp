import {Component} from 'angular2/core';
import {RESTService} from '../service/rest.service';
import {CommunicationService} from '../service/communication.service';

@Component({
  selector: 'web-cli-command-input',
  templateUrl: 'app/command-input/command-input.html'
})
export class WebCliCommandInputComponent {
  command: string;

  constructor(private _restService: RESTService,
              private _comunicationService: CommunicationService){
    this._comunicationService.currentCommand.subscribe(
      command => this.command = command
    );
  }

  execute(command: string) {
    this._restService.executeCommand(command).subscribe(
      data => console.log(data),
      error =>  console.log(<any>error)
    );
  }
}
