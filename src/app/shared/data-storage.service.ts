import { Recipe } from './../recipes/recipe.model';
import { recipeservice } from './../recipes/recipe.service';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap}  from 'rxjs/Operators';


@Injectable({providedIn:'root'})

export class DataStorageService{
    constructor (private http: HttpClient, 
                 private recipeService:recipeservice,){}



storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipes-database-74d06.firebaseio.com/recipes.json',recipes).subscribe(response=>{
        console.log(response);
        });
    }

featchRecipes(){
        return this.http
        .get<Recipe[]>('https://recipes-database-74d06.firebaseio.com/recipes.json')
        .pipe(map(recipes=>{
            return recipes.map( recipe => {
                return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };   
            });
        }),
    tap(recipes => {
        this.recipeService.setRecipes(recipes);
    }));
        


    }

}
