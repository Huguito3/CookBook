import { Injectable } from '@angular/core';

// Este injectable garante que todos los componentes de la app tengan la misma instancia de la aplicacion.
@Injectable({ providedIn: 'root' })

export class LoggingService {
  lastLog: string;
  printLog(message: string) {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
 }
}
