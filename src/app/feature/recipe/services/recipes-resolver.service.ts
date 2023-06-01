import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveData,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { DataStoreService } from 'src/app/share/services/data-store.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements ResolveData {
  constructor(private dataStorageService: DataStoreService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.dataStorageService.getRecipes();
  }
}

//deprecated, use resolver function instead.
