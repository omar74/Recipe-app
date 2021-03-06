import { map } from 'rxjs/OperatorS';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';



@Component({
    selector:'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit , OnDestroy{

isAuthenticated = false;
private userSub: Subscription;


    constructor(private dataStorageService:DataStorageService, 
                private authService:AuthService,
                private store:Store<fromApp.AppState>){}


    ngOnInit(){
        this.userSub= this.store.select('auth').pipe(map(authState=>authState.user)).subscribe(user=>{
            this.isAuthenticated= !!user;
            console.log(!user);
            console.log(!!user);
        });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFeatchData(){
        this.dataStorageService.featchRecipes().subscribe(res => {
            console.log(res);
        });
    }



    onlogOut(){
        this.authService.logOut();
    }


    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

}