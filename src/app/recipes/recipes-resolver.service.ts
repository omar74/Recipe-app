import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Observable } from 'rxjs';
import { recipeservice } from './recipe.service';

@Injectable({providedIn:'root'})


export class RecipesResolverService implements Resolve <Recipe[]> {

    constructor(private dataStorageService:DataStorageService , private recipesService:recipeservice){}

        resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
           const recipes = this.recipesService.getRecipes();
            if (recipes.length===0){
                return this.dataStorageService.featchRecipes();
            }
            else{
                return recipes;
            }
            
        }
    }
