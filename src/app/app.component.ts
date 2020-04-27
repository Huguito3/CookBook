
import { LoggingService } from './logging.service';
import { Component, SimpleChanges, OnChanges, AfterViewChecked, AfterViewInit, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, AfterViewChecked, AfterViewInit, OnInit {

  constructor(private authService: AuthService, private loggingSer: LoggingService) {

  }

  ngOnInit() {
    console.log(`OnInit ${this.paginaHabilitada}`);
    this.authService.autoLogin();
    this.loggingSer.printLog('Helo com on init do appComponent');
  }

  title = 'cookBook';
  paginaHabilitada: string;

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngOnChanges() {
    console.log('ngOnChanges');
  }
  navegaPara(navegacion: { navegaPara: string }) {
    console.log('NavegaPara');
    console.log(navegacion.navegaPara);
    this.paginaHabilitada = navegacion.navegaPara;
  }
}
