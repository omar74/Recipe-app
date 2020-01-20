import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/OperatorS';
import {throwError, BehaviorSubject}   from 'rxjs';
import {UserModel} from './user.model';
import { environment } from './../../environments/environment';
import * as fromApp from '../Store/app.reducer';
import * as AuthActions from './store/auth.action';


export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {

    private tokenExpirationTimer :any;

    user = new BehaviorSubject<UserModel>(null);

    constructor(
        private http:HttpClient,
        private router:Router,
        private store:Store<fromApp.AppState>
        ){}

signUp(email:string, password:string){
  return this.http.post<AuthResponseData>
  ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey,
    {
        email : email,
        password : password,
        returnSecureToken : true
    }
    
    )
    .pipe(
    catchError(this.handleError),
    tap(resData=>{


        this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
            );
        
    })

    );
}   

autoLogin (){
    const userData :{
        email:string;
        id: string;
        _token:string;
        _tokenExpirationDate:string;
    } = JSON.parse( localStorage.getItem('userData'));
    if (!userData){
        return;
    }

    const LoadedUser = new UserModel(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate));

    if (LoadedUser.token){
        //this.user.next(LoadedUser);
        this.store.dispatch(new AuthActions.Login({
            email:LoadedUser.email,
            userId:LoadedUser.id,
            token:LoadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate)
        })
        );
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.auotLogout(expirationDuration);
    }
}


logIn(email:string, password:string){

    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
    {
        email : email,
        password : password,
        returnSecureToken : true
    }
    )
    .pipe(
    catchError(this.handleError),
    
    tap(resData=>{


        this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
            );
        
    })
    
    );

}

logOut(){
   // this.user.next(null);
   this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer)
    {
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
}

auotLogout(expirationDuration: number){
    console.log(expirationDuration);
        this.tokenExpirationTimer= setTimeout(() => {
        this.logOut();

            

    }, expirationDuration);
}


private handleAuthentication(
    email:string, 
    userId:string, 
    token:string, 
    expiresIn:number
    
    )

    {

    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        
    const user = new UserModel (
        email,
        userId,
        token,
        expirationDate
        );

        //this.user.next(user);
        
        this.store.dispatch(new AuthActions.Login
            ({
            email:email,
            userId:userId,
            token:token,
            expirationDate:expirationDate
        }))
        this.auotLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));

}

private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An unknown error occurred !';
    if(!errorRes.error || !errorRes.error.error){
    return throwError(errorMessage);
    }


    switch(errorRes.error.error.message){
        case "EMAIL_EXISTS": errorMessage ='this email already exsists !';
        break;
        case "EMAIL_NOT_FOUND": errorMessage ='this email is not found !';
        break;
        case "INVALID_PASSWORD": errorMessage ='this password is not correct !';
        break;

    }
    return throwError(errorMessage);

}

}