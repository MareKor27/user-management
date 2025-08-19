import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  imports: [FormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  standalone: true,
})
export class UserEditComponent implements OnInit {
  user: User = { id: '', username: '', email: '' };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.userService.getUser(id).subscribe((u) => (this.user = u));
  }

  goToUserList(): void {
    this.router.navigate(['/users']);
  }

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
