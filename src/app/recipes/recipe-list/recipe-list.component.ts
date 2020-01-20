import { Subscription } from 'rxjs';
import { recipeservice } from './../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model'


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
recipes : Recipe[];
Subscription:Subscription;

  constructor(private recipeservice:recipeservice,
              private router:Router,
              private route:ActivatedRoute
              ) { }

  ngOnInit() {

   this.Subscription=  this.recipeservice.recipesChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes;
      }
    );
    this.recipes=this.recipeservice.getRecipes();

  }


  ngOnDestroy(){
    this.Subscription.unsubscribe();
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }

}
