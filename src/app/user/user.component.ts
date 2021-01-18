import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserForm } from '../dataModel';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: UserForm;
  username: any;
  @Input() userForms: UserForm;
  @Input() isUser: boolean
  @Output() userData: EventEmitter<UserForm> = new EventEmitter();

  constructor(    public activeModel: NgbActiveModal,
    ) { }

  ngOnInit(): void {
    if(this.isUser){
      this.userForm = this.userForms;
    } else {
      this.userForm = new UserForm();
    }
    
  }

  submit() {
    console.log(this.userForm);
    this.userData.emit(this.userForm);
    this.activeModel.close();
    
  }

  close() {
    this.activeModel.close();
  }

}
