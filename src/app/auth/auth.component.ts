import { Subscription } from 'rxjs/';
import { placeholderdirective } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { AlertComponent } from '../shared/alert/alert.component'


@Component({
    selector :'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{

    isLoginMode =true;
    isLoading = false; 
    error: string=null;
    

    @ViewChild(placeholderdirective, {static: false}) alertHost: placeholderdirective;


    private closeSub:Subscription;



    constructor(private authService: AuthService , 
                private router:Router,
                private componentFactoryResolver : ComponentFactoryResolver ){}



    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm ){

        if(!form.valid)
        {
            return;
        }

        const email =form.value.email;
        const password =form.value.password;
       

        let authObs:Observable<AuthResponseData>
        
        this.isLoading= true;
        

        if(this.isLoginMode)
            {
             authObs = this.authService.logIn(email,password);
            }

        
        else 
            {
            authObs =  this.authService.signUp(email,password);
            }


        authObs.subscribe(resData=>{
            console.log(resData);
            this.isLoading=false;
            this.router.navigate(['/recipes']);

        },
        errorMessage=> {
            console.log(errorMessage);
            this.error= errorMessage;
            this.showErrorAlert(errorMessage);
            this.isLoading=false;
            }

        );


        form.reset();
    }

    onHandleError(){
        this.error = null;
    }



    ngOnDestroy(){
        if (this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message:string){

       // const alertCmp = new AlertComponent();

       const alertcmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

       const hostViewContainerRef= this.alertHost.viewContainerRef;
       hostViewContainerRef.clear();
       const componentRef=  hostViewContainerRef.createComponent(alertcmpFactory);



       componentRef.instance.message=message; 
       this.closeSub = componentRef.instance.close.subscribe(()=>{
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
       });

    }
}   

