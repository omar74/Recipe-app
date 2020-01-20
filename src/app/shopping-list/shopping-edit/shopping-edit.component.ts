
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/';
import { Ingredient } from './../../shared/ingredients.model';

import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f',{static:false}) slForm:NgForm;

subscription :Subscription;
editMode = false;

editedItem:Ingredient;
editItemIndex: number;


constructor(

  private store:Store < fromApp.AppState >,

  ) { }

  ngOnInit() {
    this.subscription= this.store
    .select('shoppingList')
    .subscribe(stateData=>{
      
      if (stateData.editedIngredientIndex>-1){
          this.editMode=true;
          this.editedItem=stateData.editedIngredient;
          this.editItemIndex=stateData.editedIngredientIndex; 
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      }else{
          this.editMode=false;
      }


    });

  }


  onSubmit(form: NgForm){

    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if (this.editMode){
        //this.slService.UpdateIngredient(this.editItemIndex,newIngredient);
        this.store.dispatch(new ShoppingListAction.UpdateIngredient(newIngredient))

    }
    else{
      //this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
}

onClear(){
  this.slForm.reset();
  this.editMode = false;
  this.store.dispatch(new ShoppingListAction.StopEdit());
}

onDelete(){
  //this.slService.deleteIngredient(this.editItemIndex);

  this.store.dispatch(new ShoppingListAction.DeleteIngredient());
  this.onClear();
}

    ngOnDestroy(){
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListAction.StopEdit());
    }

}
