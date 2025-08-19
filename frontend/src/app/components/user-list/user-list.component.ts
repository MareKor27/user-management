import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }

  addUser(): void {
    this.router.navigate(['/users/add']);
  }

  editUser(id: string): void {
    this.router.navigate(['/users/edit', id]);
  }

  deleteUser(id: string): void {
    if (confirm('Czy na pewno chcesz usunąć użytkownika?')) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }
}
