import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { isWithinInterval } from 'date-fns';

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
    this.usersListFiltered = this.filterUserList(filterOption, this.usersList);
  }

  // programacao funcional - função pura - vai receber um input e fazer um output, não irá modificar propriedade ou variáveis externas, são executadas a partir do valor fornecido no input
  // função impura - altera propriedades externas a função/método
  filterUserList(filterOption: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList:IUser[] = [];

    filteredList = this.filterUsersListByName(filterOption.name, usersList);
    filteredList = this.filterUsersListByStatus(filterOption.status, filteredList);
    filteredList = this.filterUsersListByDate(filterOption.startDate, filterOption.endDate, filteredList);

    return filteredList;
  }

  filterUsersListByName(name: string | undefined, usersList:IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;

    if (NAME_NOT_TYPPED) {
      return usersList
    }

    return usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
  }

  filterUsersListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[] {
    const STATUS_NOT_SELECTED = status === undefined;

    if (STATUS_NOT_SELECTED) {
      return usersList;
    }

    return usersList.filter((user) => user.ativo === status);
  }

  filterUsersListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if (DATES_NOT_SELECTED) {
      return usersList;
    }

    return usersList.filter((user) => isWithinInterval(new Date(user.dataCadastro), {
      start: startDate,
      end: endDate
    }));
  }
}
