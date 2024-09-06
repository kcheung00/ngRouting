import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports:[RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>(); // This is signal
  private usersService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed( () => this.usersService.users.find( u => u.id === this.userId())?.name);
  userName = '';

  ngOnInit(): void {
      console.log(this.activateRoute);
      const subscription = this.activateRoute.paramMap.subscribe({
        next: paramMap => {
          this.userName = this.usersService.users.find( (u) => u.id === paramMap.get('userId'))?.name || '';
        },          
      });

      this.destroyRef.onDestroy( () => subscription.unsubscribe() );

  }
}
