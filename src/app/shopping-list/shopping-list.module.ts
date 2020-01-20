import { LoggingService } from './../logging.service';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { AlertComponent } from '../shared/alert/alert.component';


@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],

    imports :[

        FormsModule,
        SharedModule,

        RouterModule.forChild([
            {path: '',component:ShoppingListComponent},]),
            SharedModule,
    ],

    providers:[
       //   LoggingService
    ]

})
export class ShoppingListModule {

}