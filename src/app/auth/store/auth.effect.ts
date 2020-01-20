import { HttpClient } from '@angular/common/http';

import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth.action';
import { switchMap, catchError, map } from 'rxjs/OperatorS';
import {environment} from '../../../environments/environment';
import { of } from 'rxjs';


export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}



/*

export class AuthEffects{
    @Effect()

    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart)=>
        {
            return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
            {
                email : authData.payload.email,
                password : authData.payload.password,
                returnSecureToken : true
            }
            ).pipe(catchError(error=>{
                of();
            }), map(resData=>{
                of();
            }));
        }),
        
    );
    constructor (private actions$: Actions,
                 private http:HttpClient){

    }
}

*/