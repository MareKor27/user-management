import { Component } from '@angular/core';
import { NewUser, User, UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true,
})
export class UserFormComponent {
  user: NewUser = { username: '', email: '' };

  constructor(private userService: UserService, private router: Router) {}

  saveUser(): void {
    this.userService.addUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

  goToUserList(): void {
    this.router.navigate(['/users']);
  }
}
