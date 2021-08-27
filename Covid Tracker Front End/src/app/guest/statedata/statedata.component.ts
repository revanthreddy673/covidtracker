import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-statedata',
  templateUrl: './statedata.component.html',
  styleUrls: ['./statedata.component.css'],
})
export class StatedataComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  stateNames: { name: string; selected: boolean }[] = [];
  selectedValue = '';
  isdropDownOpen = false;
  stateArray: string[] = [];
  errorMessage = null;
  selectedStates: string[] = [];

  ngOnInit(): void {
    this.dataService.getStateNames().subscribe(
      (resolve) => {
        this.stateArray = resolve;
        console.log(this.stateArray);
        if (this.stateArray) {
          this.selectedValue = this.stateArray[0];
          this.selectedStates.push(this.selectedValue);
        }

        for (let i = 0; i < this.stateArray.length; i++) {
          let tempObj: { name: string; selected: boolean } = {
            name: '',
            selected: false,
          };
          tempObj['name'] = this.stateArray[i];
          if (i === 0) {
            tempObj['selected'] = true;
          } else {
            tempObj['selected'] = false;
          }
          this.stateNames.push(tempObj);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getShortName(state: string) {
    if (state.length > 16) {
      return state.substr(0, 14) + '..';
    }
    return state;
  }

  onCheckBoxClick(state: { name: string; selected: boolean }) {
    if (state.selected && this.selectedStates.length === 1) {
      return;
    }
    state.selected = !state.selected;
    this.selectedStates.splice(0, this.stateNames.length);
    for (let i in this.stateNames) {
      if (this.stateNames[i].selected) {
        this.selectedStates.push(this.stateNames[i].name);
      }
    }
    if (this.selectedStates.length > 1) {
      this.selectedValue = 'multiple';
    } else {
      this.selectedValue = this.selectedStates[0];
    }
    if (this.selectedStates.length > 5) {
      state.selected = !state.selected;
      this.errorMessage = 'Maximum Selection Limit Reached';
    }
  }

  onCloseAlert() {
    this.errorMessage = null;
  }

  setTopForCompare() {
    if (this.isdropDownOpen) {
      (<HTMLElement>document.querySelector('.compare')).style.top = '25%';
    } else {
      (<HTMLElement>document.querySelector('.compare')).style.top = '0';
    }
  }

  onClickCompare() {
    if (this.selectedStates.length < 2) {
      this.errorMessage = 'Please Select Atleast Two States';
      return;
    }
    this.dataService.statesListForCompare(this.selectedStates);
    this.router.navigate(['../', 'compare'], { relativeTo: this.route });
  }
}
