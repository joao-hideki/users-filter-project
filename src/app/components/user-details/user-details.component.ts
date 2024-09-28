import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces/user/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  // formas de inicializar um objeto customizado

  // @Input() user: IUser = {} as IUser; // fazer o casting e inciando um objeto vazio com os valores como undefined
  // @Input() user: IUser = {/*inciando os valores das propriedades*/};
  // @Input() user: Partial<IUser> = {}; // partial - significa que o objeto pode conter algumas propriedades da tipagem passada, mas não precisa seguir a risca
  // @Input() user: IUser = new User(); // instanciar uma classe que implementa a interface
  // class User implements IUser {
  //   // inicializando os valores das propriedades
  // }

  @Input({required: true}) user: IUser = {} as IUser;

}


