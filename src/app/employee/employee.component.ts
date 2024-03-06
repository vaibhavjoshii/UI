import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  employeeArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  currentEmployeeID = "";

  fName: String = "";
  lName: string = "";
  email: string = "";
  pNumber: string = "";
  dob: string = "";
  salary: number = 0;

  constructor(private http: HttpClient ) 
  {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.http.get("http://localhost:3000/employees/list").subscribe((resultData: any)=>
    {
        this.employeeArray = resultData.lists;
    });
  }

  emptyFieldValues() {
    this.fName = '';
    this.lName = '';
    this.email  = '';
    this.pNumber  = '';
    this.dob  = '';
    this.salary  = 0;
  }

  register() {
    let bodyData = {
      "firstName": this.fName,
      "lastName": this.lName,
      "email": this.email,
      "phoneNumber": this.pNumber,
      "dateOfBirth": this.dob,
      "salary": this.salary
    };

    this.http.post("http://localhost:3000/employees/add",bodyData).subscribe((resultData: any)=>
    {
        alert("Employee Registered Successfully");
        this.emptyFieldValues();
        this.getAllEmployees();
    });
  }

  setUpdate(data: any) 
  {
    this.fName = data.firstName;
    this.lName = data.lastName;
    this.email  = data.email;
    this.pNumber  = data.phoneNumber;
    this.dob  = data.dateOfBirth;
    this.salary  = data.salary;
    this.currentEmployeeID = data._id;
  }

  updateRecords(id: any)
  {
    let bodyData = {
      "firstName": this.fName,
      "lastName": this.lName,
      "email": this.email,
      "phoneNumber": this.pNumber,
      "dateOfBirth": this.dob,
      "salary": this.salary
    };
    
    this.http.put("http://localhost:3000/employees/update/"+ id,bodyData).subscribe((resultData: any)=>
    {
        alert("Employee details updated");
        this.emptyFieldValues();
        this.getAllEmployees();
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:3000/employees/delete/"+ data._id).subscribe((resultData: any)=>
    {
        alert("Employee Deleted")
        this.getAllEmployees();
    });
    }
    
  save() {
    if (this.currentEmployeeID == '') {
      this.register();
    } else {
      this.updateRecords(this.currentEmployeeID);
    }       
  }
}
