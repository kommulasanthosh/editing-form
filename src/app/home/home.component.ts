import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserForm } from '../dataModel';
import { HomeService } from '../home.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tableData: Array<UserForm>;

  constructor(
    private homeService: HomeService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.tableData = new Array<UserForm>();

    const tableData = localStorage.getItem('tableData');
    const tabData = JSON.parse(tableData);
    console.log(tabData);
    if(tabData) {
      if(tabData.length >0 ) {
        this.tableData = tabData;
      }
    }
     else {
      this.showTable();
    }
    
  }

  showTable() {
    
    this.homeService.showTable().subscribe((response: any) => {
      this.tableData = response.result;
    });
  }

  add() {
    const user = this.modalService.open(UserComponent);
    user.componentInstance.userData.subscribe((receivedEntry) => {
     console.log(receivedEntry);
     this.tableData.push(receivedEntry);
     localStorage.setItem('tableData', JSON.stringify(this.tableData));
    });
    
  }

  edit(data: UserForm, index: number) {
    const user = this.modalService.open(UserComponent);
    user.componentInstance.userForms = data;
    user.componentInstance.isUser = true;
    user.componentInstance.userData.subscribe((receivedEntry) => {
      this.tableData[index] = receivedEntry;
    });
  }

  delete(index: number) {
    console.log(index)
    this.tableData.splice(index, 1);
   localStorage.setItem('tableData', JSON.stringify(this.tableData));
  }

}
