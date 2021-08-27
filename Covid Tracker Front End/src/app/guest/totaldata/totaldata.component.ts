import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { States } from 'src/app/modelclass/states.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-totaldata',
  templateUrl: './totaldata.component.html',
  styleUrls: ['./totaldata.component.css'],
})
export class TotaldataComponent implements OnInit {
  statesData: States[] = [];
  dataLoaded: Promise<boolean>;
  errorMessage = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService.getAllStatesData().subscribe(
      (resolve) => {
        console.log(resolve);
        this.statesData = resolve;
        this.dataLoaded = Promise.resolve(true);
      },
      (error) => {
        console.log(error);
        this.errorMessage =
          'Something went wrong while retrieving all states data';
        this.dataLoaded = Promise.reject();
      }
    );
  }

  onHandleError() {
    this.errorMessage = null;
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }

  onHomeClick() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
