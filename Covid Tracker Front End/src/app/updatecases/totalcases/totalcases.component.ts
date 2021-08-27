import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { States } from 'src/app/modelclass/states.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-totalcases',
  templateUrl: './totalcases.component.html',
  styleUrls: ['./totalcases.component.css'],
})
export class TotalcasesComponent implements OnInit {
  totalCasesForm: FormGroup;
  message: string = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    let state: string = '';
    let confirmedcases: number = 0;
    let deaths: number = 0;
    let recovered: number = 0;

    this.totalCasesForm = new FormGroup({
      state: new FormControl(state, Validators.required),
      confirmedcases: new FormControl(confirmedcases),
      deaths: new FormControl(deaths),
      recovered: new FormControl(recovered),
    });
  }

  onCloseAlert() {
    this.message = null;
  }

  onFormSubmit() {
    const totalCases = new States(
      -1,
      this.totalCasesForm.value.state,
      this.totalCasesForm.value.confirmedcases,
      this.totalCasesForm.value.deaths,
      this.totalCasesForm.value.recovered
    );

    this.dataService.addTotalCases(totalCases).subscribe(
      (resolve) => {
        console.log(resolve);
        this.message = 'Added Succesfully';
        this.totalCasesForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
