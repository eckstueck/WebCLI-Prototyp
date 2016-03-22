export class Settings {
  public logRefreshRate: number;
  public queueRefreshRate: number;
  public historySize: number;
  public autoscroll: boolean;

  constructor(logRR: number, qRR: number, hS: number, aS: boolean){
    this.logRefreshRate = logRR;
    this.queueRefreshRate = qRR;
    this.historySize = hS;
    this.autoscroll= aS;
  }
}
