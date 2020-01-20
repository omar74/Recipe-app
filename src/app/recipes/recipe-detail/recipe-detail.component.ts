import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import {recipeservice} from '../recipe.service';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  
 recipe:Recipe;
 id:number;

  constructor(private recipeservice:recipeservice,
              private route : ActivatedRoute,
              private router:Router) { 

  }

  ngOnInit() {
     this.route.params.subscribe(
       (params: Params)=>{
        this.id =+ params['id'];
        this.recipe = this.recipeservice.getRecipe( this.id ); 
       }
     );
  }

  onAddToShopList(){
    this.recipeservice.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate (['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe(){
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
