import { LoggingService } from './../logging.service';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { loadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { placeholderdirective } from './placeholder/placeholder.directive';
import { dropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AlertComponent,
        loadingSpinnerComponent,
        placeholderdirective,
        dropdownDirective,

    ],

    imports:[
        CommonModule
    ],

    exports:[
        AlertComponent,
        loadingSpinnerComponent,
        placeholderdirective,
        dropdownDirective,
        CommonModule
    ],

    entryComponents:[AlertComponent],

    providers:[
        LoggingService
    ]
})

export class SharedModule{

}