

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import * as ShoppingListActions  from './../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class recipeservice {

  recipesChanged= new Subject<Recipe[]>();
    
    
    /*private recipes : Recipe[]=[
       
       
        new Recipe(
            'A Test Recipe',
         'this is a simple test',
         'http://res.publicdomainfiles.com/pdf_view/2/13494146416391.jpg',
         [
             new Ingredient ('meat',1),
             new Ingredient ('burger',22)
         ]
         ),


        new Recipe(
            'another Test Recipe',
             'this is a simple test',
             'http://res.publicdomainfiles.com/pdf_view/2/13494146416391.jpg',
             [
                new Ingredient ('salat',1),
                new Ingredient ('friez',22)    
             ]
             )
      ];*/

      private recipes : Recipe[]=[];

      constructor (
        private store: Store<fromApp.AppState>){}



      setRecipes(recipes:Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }


      getRecipes(){
          return this.recipes.slice();
      }


      getRecipe(index:number){
        return this.recipes[index];
      }

      addIngredientToShoppingList(ingredients:Ingredient[]){
        //this.slService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());

      }

      updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}