import { Component, OnDestroy, OnInit } from '@angular/core';

import { DataStoreService } from '../../services/data-store.service';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private userSubscription: Subscription | undefined;

  constructor(
    private dataStoreService: DataStoreService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getAuthSubject()
      .subscribe(
        (user) => (this.isAuthenticated = user?.getRegistered() ?? false)
      );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  saveRecipes() {
    this.dataStoreService.saveRecipes();
  }

  fetchRecipes() {
    this.dataStoreService.getRecipes().subscribe();
  }

  logout() {
    this.authService.logout();
  }
}
