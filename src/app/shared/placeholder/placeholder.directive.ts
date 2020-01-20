import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlaceholder]'
})

export class placeholderdirective{

constructor( public viewContainerRef: ViewContainerRef){}

}