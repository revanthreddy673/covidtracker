import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trenddata',
  templateUrl: './trenddata.component.html',
  styleUrls: ['./trenddata.component.css'],
})
export class TrenddataComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.navigate(['India'], { relativeTo: this.route });
  }
}
