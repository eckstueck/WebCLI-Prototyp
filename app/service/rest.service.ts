import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Commands} from '../commands/commands';
import {Log} from '../log/log';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RESTService {
  // getCommandsUrl: string = "http://localhost:8291/mir/servlets/MCRWebCLIServlet?request=getKnownCommands";
  getCommandsUrl: string = "/getKnownCommands";
  // getLogUrl: string = "http://localhost:8291/mir/servlets/MCRWebCLIServlet?request=getLogs";
  getLogUrl: string = "/getLogs";
  // executeCommandUrl: string = "http://localhost:8291/mir/servlets/MCRWebCLIServlet?run=";
  executeCommandUrl: string = "/run?command=";

  constructor(private http: Http) {}

  getCommands() {
    return this.http.get(this.getCommandsUrl)
               .map(res => <Commands[]> res.json().commands)
              //  .do(data => console.log(data))
               .catch(this.handleError);
  }

  getLog() {
    return this.http.get(this.getLogUrl)
               .map(res => <Log[]> res.json().logs)
              //  .do(data => console.log(data))
               .catch(this.handleError);
  }

  executeCommand(command: string) {
    return this.http.get(this.executeCommandUrl + command)
                    .catch(this.handleError)
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
