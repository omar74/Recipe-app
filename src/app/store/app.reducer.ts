import { ActionReducerMap } from '@ngrx/store';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';



export interface AppState{
    shoppingList : fromShoppingList.State;
    auth : fromAuth.State;
}

export const appReduser : ActionReducerMap <AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth : fromAuth.authReducer
}; 