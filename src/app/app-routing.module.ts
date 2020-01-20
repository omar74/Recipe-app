
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes: Routes=[

        {path: '',redirectTo: '/recipes', pathMatch:'full'},
        {path: 'recipes',loadChildren:'./recipes/recipes.module#RecipesModule'},
        {path: 'shopping-list', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
        {path: 'auth', loadChildren:'./auth/auth.module#AuthModule'}





]; 

@NgModule({

    imports:[RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule{

}