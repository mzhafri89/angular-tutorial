import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { Recipe } from 'src/app/feature/recipe/models/recipe.model';
import { RecipeService } from 'src/app/feature/recipe/services/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private FIREBASE = 'https://ng-recipe-book-e8f84.firebaseio.com/';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
