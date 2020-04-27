import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() message: string;
  //no queremos passar ningun dato solo queremos informar que fue cerrado el componente.
  // tslint:disable-next-line: no-output-native
  @Output() close = new EventEmitter<void>();
  constructor() { }
  ngOnDestroy(): void {
    console.log('destroy do app de mensagem');
  }

  ngOnInit(): void {
  }
  onClose() {
    this.close.emit();
  }
}
