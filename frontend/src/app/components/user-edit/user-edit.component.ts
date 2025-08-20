import { Component, inject, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

interface EditUserForm {
  id: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
}

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
  standalone: true,
})
export class UserEditComponent implements OnInit {
  editUserForm = new FormGroup<EditUserForm>({
    id: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.userService
        .getUser(id)
        .subscribe((u) => this.editUserForm.patchValue(u));
  }

  goToUserList(): void {
    this.router.navigate(['/users']);
  }

  updateUser(): void {
    this.userService
      .updateUser(this.editUserForm.getRawValue())
      .subscribe(() => {
        this.router.navigate(['/users']);
      });
  }
}
