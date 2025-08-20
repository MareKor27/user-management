import { Component, inject, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private userService = inject(UserService);
  private router = inject(Router);
  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  loadUsers(): void {
    const sub = this.userService
      .getUsers()
      .subscribe((users) => (this.users = users));
    this.subscriptions.add(sub);
  }

  addUser(): void {
    this.router.navigate(['/users/add']);
  }

  editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string): void {
    if (confirm('Czy na pewno chcesz usunąć użytkownika?')) {
      const sub = this.userService
        .deleteUser(id)
        .pipe(switchMap(() => this.userService.getUsers()))
        .subscribe((users) => (this.users = users));
      this.subscriptions.add(sub);
    }
  }
}
