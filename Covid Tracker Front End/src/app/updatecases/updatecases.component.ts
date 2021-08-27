import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatecases',
  templateUrl: './updatecases.component.html',
  styleUrls: ['./updatecases.component.css'],
})
export class UpdatecasesComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
