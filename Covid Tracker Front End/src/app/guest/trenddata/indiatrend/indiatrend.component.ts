import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import * as d3 from 'd3';
import { MonthlyCases } from 'src/app/modelclass/monthly-cases.model';

@Component({
  selector: 'app-indiatrend',
  templateUrl: './indiatrend.component.html',
  styleUrls: ['./indiatrend.component.css'],
})
export class IndiatrendComponent implements OnInit {
  labels: string[] = ['Confirmed Cases', 'Recovered', 'Active Cases', 'Deaths'];
  colors: string[] = ['#a1bded', '#84e3bb', '#e6a481', '#f29497'];
  trendata: MonthlyCases[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.getMonthlyCasesByRegion('India').subscribe(
      (resolve) => {
        console.log(resolve);
        this.trendata = resolve;
        this.drawTrendChart('trendchart');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onHomeClick() {
    this.router.navigate(['../../', 'view'], { relativeTo: this.route });
  }

  getBorderForSpan(index: number): object {
    return { border: `2px solid ${this.colors[index]}` };
  }

  getBackgroundForSpan(index: number): object {
    return { background: `${this.colors[index]}` };
  }

  drawTrendChart(className: string) {
    let data = [];

    let chart = d3.select(`.${className}`);
    let width = chart.style('width');
    let height = chart.style('height');

    let svg = chart.append('svg').attr('height', height).attr('width', width);

    let g = svg.append('g').attr('transform', 'translate(10,10)');

    //forming data in correct way
    let itemConfirmed = { name: 'Confirmed' };
    let itemActiveCases = { name: 'ActiveCases' };
    let itemRecovered = { name: 'Recoverd' };
    let itemDeaths = { name: 'Deaths' };

    let confirmedValues = [];
    let activeValues = [];
    let recoveredValues = [];
    let deathsValues = [];

    for (let arrayindex in this.trendata) {
      let deepConfirmedValues = {};
      let deepRecoveredValues = {};
      let deepActiveValues = {};
      let deepDeathsValues = {};

      deepConfirmedValues['timeperiod'] = this.trendata[arrayindex].timePeriod;
      deepConfirmedValues['totalnumber'] = this.trendata[
        arrayindex
      ].confirmedCases;
      deepConfirmedValues['color'] = this.colors[0];

      deepRecoveredValues['timeperiod'] = this.trendata[arrayindex].timePeriod;
      deepRecoveredValues['totalnumber'] = this.trendata[arrayindex].recovered;
      deepRecoveredValues['color'] = this.colors[1];

      deepActiveValues['timeperiod'] = this.trendata[arrayindex].timePeriod;
      deepActiveValues['totalnumber'] = this.trendata[arrayindex].activeCases;
      deepActiveValues['color'] = this.colors[2];

      deepDeathsValues['timeperiod'] = this.trendata[arrayindex].timePeriod;
      deepDeathsValues['totalnumber'] = this.trendata[arrayindex].deaths;
      deepDeathsValues['color'] = this.colors[3];

      confirmedValues.push(deepConfirmedValues);
      activeValues.push(deepActiveValues);
      recoveredValues.push(deepRecoveredValues);
      deathsValues.push(deepDeathsValues);
    }

    itemConfirmed['values'] = confirmedValues;
    itemRecovered['values'] = recoveredValues;
    itemActiveCases['values'] = activeValues;
    itemDeaths['values'] = deathsValues;

    data.push(itemConfirmed);
    data.push(itemActiveCases);
    data.push(itemRecovered);
    data.push(itemDeaths);

    console.log(data);

    let maxValue =
      this.trendata[this.trendata.length - 1].confirmedCases +
      this.trendata[this.trendata.length - 1].confirmedCases / 5;

    let xScale = d3.scaleBand().range([0, parseFloat(width) - 20]);
    let yScale = d3.scaleLinear().range([parseFloat(height) - 20, 0]);
    xScale.domain(
      data[0].values.map(function (d) {
        return d.timeperiod;
      })
    );
    yScale.domain([0, maxValue]);

    let xAxis = g
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${parseFloat(height) - 55})`)
      .call(d3.axisBottom(xScale))
      .selectAll('.axis .tick text')
      .call(function (t) {
        t.each(function (d: any) {
          let self = d3.select(this);
          let splitText = self.text().split(' ');
          self.text('');
          self
            .append('tspan')
            .attr('class', 'tspantext')
            .attr('x', 0)
            .attr('dy', '0.8em')
            .text(splitText[0]);
          self
            .append('tspan')
            .attr('class', 'tspantext')
            .attr('x', 0)
            .attr('dy', '1.2em')
            .text(splitText[1]);
        });
      });

    d3.selectAll('.axis line').remove();
    d3.selectAll('.tspantext')
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('color', '#fff')
      .style('font-weight', 400);

    d3.selectAll('.axis path')
      .style('stroke', '#D3D3D3')
      .style('shape-rendering', 'crispEdges');

    let lineHere = d3
      .line()
      .x(function (d: any) {
        return xScale(d.timeperiod) + xScale.bandwidth() / 2;
      })
      .y(function (d: any) {
        return yScale(d.totalnumber);
      })
      .defined(function (d: any) {
        return d.totalnumber != null;
      });

    var segment = g
      .selectAll('.segment')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', 'translate(0,-55)')
      .attr('class', 'segment');

    segment
      .append('path')
      .attr('class', 'line')
      .attr('visible', 1)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('d', function (d: any) {
        return lineHere(d.values);
      })
      .style('stroke', (d, i) => d.values[0].color);

    //append the circle
    segment
      .selectAll('circle')
      .data(function (d) {
        return d.values;
      })
      .enter()
      .append('circle')
      .on('mouseover', function (event: any, d: any) {
        d3.select(this).style('cursor', 'pointer');
        d3.select('body')
          .append('div')
          .style('position', 'absolute')
          .style('z-index', 2)
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px')
          .style('font-size', '16px')
          .style('color', '#fff')
          .style('font-weight', 700)
          .attr('class', 'datalabel')
          .text(d.totalnumber);
      })
      .on('mouseout', function (event: any, d: any) {
        d3.select(this).style('cursor', 'none');
        d3.selectAll('.datalabel').remove();
      })
      .attr('cx', function (d: any) {
        return xScale(d.timeperiod) + xScale.bandwidth() / 2;
      })
      .attr('cy', function (d: any) {
        return yScale(d.totalnumber);
      })
      .attr('r', 3)
      .style('opacity', 0.85)
      .style('fill', '#696969')
      .style('stroke', (d: any, i) => d.color);
  }
}
