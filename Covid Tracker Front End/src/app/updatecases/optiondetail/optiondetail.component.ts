import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-optiondetail',
  templateUrl: './optiondetail.component.html',
  styleUrls: ['./optiondetail.component.css'],
})
export class OptiondetailComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  updateTotalCases() {
    this.router.navigate(['../', 'totalcases'], { relativeTo: this.route });
  }

  updateDailyCases() {
    this.router.navigate(['../', 'dailycases'], { relativeTo: this.route });
  }
}
