import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewoptions',
  templateUrl: './viewoptions.component.html',
  styleUrls: ['./viewoptions.component.css'],
})
export class ViewoptionsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onclickTotalData() {
    this.router.navigate(['../', 'totaldata'], { relativeTo: this.route });
  }

  onclickStateData() {
    this.router.navigate(['../', 'statedata'], { relativeTo: this.route });
  }

  onclickTrendData() {
    this.router.navigate(['../', 'trenddata'], { relativeTo: this.route });
  }
}
