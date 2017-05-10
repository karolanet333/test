import { Http } from '@angular/http';
//import { UserConfigService } from './../services/user-config.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../models/user';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  private users: User[];

  //subscriptions
  private usersSubscription: Subscription;

  constructor(
    private usersService: UsersService//,
    //private userConfigService: UserConfigService
  ) { 
    this.loadUsers();
  }

  ngOnInit() {
  }

  private loadUsers():void {
    this.usersSubscription = this.usersService.getAll().subscribe(data => { 
      this.users = data;
    });
  }

  private setUser(user: User){
    //this.userConfigService.user = user;
  }

}
