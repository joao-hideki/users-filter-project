import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { filterUserList } from './utils/filter-users-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  usersList: IUser[] = [];
  usersListFiltered: IUser[] = [];
  userSelected:IUser = {} as IUser;
  showUserDetails: boolean = false;

  onUserSelected(user: IUser) {
    this.userSelected= user;
    this.showUserDetails = true;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = UsersList;
    }, 3000)
  }

  onFilter(filterOption: IFilterOptions) {
    this.usersListFiltered = filterUserList(filterOption, this.usersList);
  }
}
