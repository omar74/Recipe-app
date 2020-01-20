import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { recipeservice } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
@NgModule({

    providers:[
    recipeservice,

    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi:true
    }
    ]
})


export class CoreModule{

}