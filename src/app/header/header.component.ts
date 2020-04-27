import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../providers/dataBase/data-storage.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() navegacion = new EventEmitter<{navegaPara:string}>();
  isAuthenticated = false;
  private userSub: Subscription;
  constructor(private dataStorage: DataStorageService, private authSevice: AuthService) { }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  ngOnInit() {
    this.userSub = this.authSevice.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true;
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout(){
    this.authSevice.logOut();
  }
  onSaveData() {
    this.dataStorage.storeRecipes();
  }
  // selecionouRecipes(navegacinrecipe: string) {
  //   console.log('Recipe');
  //   this.navegacion.emit({navegaPara:navegacinrecipe});
  // }
  // selecionouShooping() {
  //   console.log('Shopping');
  //   this.navegacion.emit({navegaPara:'S'});
  // }

  onFetchData() {
    this.dataStorage.fetchRecipes().subscribe();
  }
}
