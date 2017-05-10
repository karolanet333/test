import { UserConfigService } from './../services/user-config.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from './../models/user';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled: boolean = false;
  public status: {isopen: boolean} = {isopen: false};
  private users;/*: User[] = [
    {Id: 1, Name: "Generador de SolFac", Profile: {Id: 2, Code: "SOLFAC_GEN", Name: "Generador de SolFac" }}
  ];*/

  //subscriptions
  private usersSubscription: Subscription;

  constructor(
    private usersService: UsersService,
    private userConfigService: UserConfigService
  ) { 
    this.loadUsers();
  }

  private loadUsers():void {
    this.usersSubscription = this.usersService.getAll().subscribe(data => { 
      this.users = data;
    });
  }

  private setUser(user: User){
    this.userConfigService.setUser(user);
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {}
}
