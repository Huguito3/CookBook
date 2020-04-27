import { PlaceholderDirective } from './../shared/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
  isLoggingMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  onSwitchMode() {
    this.isLoggingMode = !this.isLoggingMode;
  }

  onSubmit(authForm: NgForm) {

    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const pass = authForm.value.password;
    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoggingMode) {
      authObservable = this.authService.loging(email, pass);
    } else {

      authObservable = this.authService.signUp(email, pass);
    }
    //como el codigo es el mismo para las dos implemetnamos uno solo
    authObservable.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );
    authForm.reset();
  }

  private showErrorAlert(message: string) {
    //alert component factory ahora es una factory que sabe crear component Alert Component
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    //Ahora que sabe como crearla precisamos crear una y donde debe colocarla en el DOM.
    //creamos la directiva para basicamente mostrarle a angular donde colcoar el component, poder tener una referencia
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
  onHandleError() {
    this.error = null;
  }
}
