import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from 'src/app/feature/recipe/models/recipe.model';
import { RecipeService } from 'src/app/feature/recipe/services/recipe.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private FIREBASE = environment.FIREBASE_DB;

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    this.http
      .put(`${this.FIREBASE}/recipes.json`, this.recipeService.getRecipes())
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
        complete: () => console.log('saved'),
      });
  }

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.FIREBASE}/recipes.json`).pipe(
      map((recipes: Recipe[]) =>
        recipes.map((recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients ?? [],
        }))
      ),
      tap((response) => this.recipeService.setRecipes(response))
    );

    //alternative to using interceptors
    // return this.authService.getAuthSubject().pipe(
    //   take(1), //only receive one event then un sub
    //   exhaustMap(
    //     (
    //       user //convert current sub to other sub
    //     ) => {
    //       return this.http.get<Recipe[]>(`${this.FIREBASE}/recipes.json`, {
    //         params: new HttpParams().set('auth', user.getAccessToken()),
    //       });
    //     }
    //   ),
    //   map((recipes: Recipe[]) => {
    //     return recipes.map((recipe) => ({
    //       ...recipe,
    //       ingredients: recipe.ingredients ?? [],
    //     }));
    //   }),
    //   tap((response) => {
    //     this.recipeService.setRecipes(response);
    //   })
    // );
  }
}
