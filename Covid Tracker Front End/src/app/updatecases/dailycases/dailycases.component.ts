import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DailyUpdate } from 'src/app/modelclass/daily-update.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dailycases',
  templateUrl: './dailycases.component.html',
  styleUrls: ['./dailycases.component.css'],
})
export class DailycasesComponent implements OnInit {
  dailyCasesForm: FormGroup;
  message: string = null;
  statenames: [string] = [''];
  dataLoaded: Promise<boolean>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getStateNames().subscribe(
      (resolove) => {
        this.statenames = resolove;
        this.initform();
        this.dataLoaded = Promise.resolve(true);
      },
      (error) => {
        this.message = 'Error in retrieving state names';
        this.dataLoaded = Promise.reject();
      }
    );
  }

  initform() {
    let confirmedcases: number = 0;
    let deaths: number = 0;
    let recovered: number = 0;

    this.dailyCasesForm = new FormGroup({
      state: new FormControl(this.statenames[0], Validators.required),
      confirmedcases: new FormControl(confirmedcases),
      deaths: new FormControl(deaths),
      recovered: new FormControl(recovered),
    });
  }

  onFormSubmit() {
    const dailyCases = new DailyUpdate(
      -1,
      this.dailyCasesForm.value.state,
      this.dailyCasesForm.value.confirmedcases,
      this.dailyCasesForm.value.deaths,
      this.dailyCasesForm.value.recovered
    );

    this.dataService.updateDailyCases(dailyCases).subscribe(
      (resolve) => {
        console.log(resolve);
        this.message = 'Added Succesfully';
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
