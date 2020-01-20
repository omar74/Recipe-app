import { Injectable } from '@angular/core';

//@Injectable({providedIn: 'root'})

export class LoggingService {


    lastLog: string;

    printlog(message:string){
        console.log(message);
        console.log(this.lastLog);
        this.lastLog=message;
    }
}