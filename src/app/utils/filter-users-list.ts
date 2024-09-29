import { isWithinInterval } from "date-fns";
import { IUser } from "../interfaces/user/user.interface";
import { IFilterOptions } from "../interfaces/filter-options.interface";

const filterUsersListByName = (name: string | undefined, usersList:IUser[]): IUser[] => {
  const NAME_NOT_TYPPED = name === undefined;

  if (NAME_NOT_TYPPED) {
    return usersList
  }

  return usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
}

const filterUsersListByStatus = (status: boolean | undefined, usersList: IUser[]): IUser[] => {
  const STATUS_NOT_SELECTED = status === undefined;

  if (STATUS_NOT_SELECTED) {
    return usersList;
  }

  return usersList.filter((user) => user.ativo === status);
}

const filterUsersListByDate = (startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] => {
  const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

  if (DATES_NOT_SELECTED) {
    return usersList;
  }

  return usersList.filter((user) => isWithinInterval(new Date(user.dataCadastro), {
    start: startDate,
    end: endDate
  }));
}

// programacao funcional - função pura - vai receber um input e fazer um output, não irá modificar propriedade ou variáveis externas, são executadas a partir do valor fornecido no input
// função impura - altera propriedades externas a função/método
// export const filterUserList = (filterOption: IFilterOptions, usersList: IUser[]): IUser[] => {
const filterUserList = (filterOption: IFilterOptions, usersList: IUser[]): IUser[] => {
  let filteredList:IUser[] = [];

  filteredList = filterUsersListByName(filterOption.name, usersList);
  filteredList = filterUsersListByStatus(filterOption.status, filteredList);
  filteredList = filterUsersListByDate(filterOption.startDate, filterOption.endDate, filteredList);

  return filteredList;
}

export {filterUserList }; // exportando a função, cuja o nome é igual ao nome do arquivo
