import { Subscription, Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from './../shared/ingredients.model';

import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Observable <{ingredients: Ingredient[]}>;
  private igChangeSub: Subscription;

  constructor(

              private loggingService:LoggingService,
              private store :Store<fromApp.AppState>
              ) { }

  ngOnInit() {
    this.ingredients=  this.store.select('shoppingList');
    /*this.ingredients= this.slService.getIngredients();
    this.igChangeSub= this.slService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients;
      }
    );*/

    this.loggingService.printlog("hello from shopping");
  }

  onEditItem(index:number){
   // this.slService.startedEditing.next(index);
   this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }

  

  ngOnDestroy():void{
   // this.igChangeSub.unsubscribe();
  }

}
