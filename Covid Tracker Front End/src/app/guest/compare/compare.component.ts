import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { States } from 'src/app/modelclass/states.model';
import { DataService } from 'src/app/services/data.service';

import * as d3 from 'd3';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CompareComponent implements OnInit {
  statesData: States[] = [];
  stateNamesList: string[] = [];
  colors: string[] = ['#44b9df', '#f8d84e', '#f48885', '#f6af50', '#6db36e'];

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.dataService.statesList.length === 0) {
      this.router.navigate(['../', 'statedata'], { relativeTo: this.route });
      return;
    }

    console.log(this.dataService.statesList);
    this.stateNamesList = this.dataService.statesList;

    this.dataService.getAllStatesData().subscribe(
      (data) => {
        for (let index in this.dataService.statesList) {
          for (let tempIndex in data) {
            if (
              data[tempIndex].stateName === this.dataService.statesList[index]
            ) {
              this.statesData.push(data[tempIndex]);
              break;
            }
          }
        }
        console.log(this.statesData);
        this.drawPieChart('confirmedChart');
        this.drawPieChart('deathsChart');
        this.drawPieChart('recoveredChart');
      },
      (error) => {
        console.log(error);
      }
    );

    /* let p = d3
      .selectAll('p')
      .data(['1', '2', '3'])
      .text(function (d) {
        return d;
      });

    p.enter()
      .append('p')
      .text(function (d) {
        return d;
      }); */
  }

  calculateWidthOfStateDiv(): object {
    return { width: `calc(100%/${this.stateNamesList.length})` };
  }

  getBorderForSpan(index: number): object {
    return { border: `6px solid ${this.colors[index]}` };
  }

  changeChartType() {
    if (document.querySelector('.pietext').classList.length === 2) {
      document.querySelector('.pietext').classList.toggle('highlight');
      document.querySelector('.bartext').classList.toggle('highlight');
      (<HTMLElement>document.querySelector('.imgSliderPie')).style.display =
        'none';
      (<HTMLElement>document.querySelector('.imgSliderBar')).style.display =
        'inline-block';
      this.drawBarChart('confirmedChart');
      this.drawBarChart('deathsChart');
      this.drawBarChart('recoveredChart');
    } else if (document.querySelector('.bartext').classList.length === 2) {
      document.querySelector('.bartext').classList.toggle('highlight');
      document.querySelector('.pietext').classList.toggle('highlight');
      (<HTMLElement>document.querySelector('.imgSliderBar')).style.display =
        'none';
      (<HTMLElement>document.querySelector('.imgSliderPie')).style.display =
        'inline-block';
      this.drawPieChart('confirmedChart');
      this.drawPieChart('deathsChart');
      this.drawPieChart('recoveredChart');
    }
  }

  drawPieChart(className: string) {
    (<HTMLElement>document.querySelector(`.${className}`)).innerText = '';

    let data = [];

    if (className === 'confirmedChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].confirmedCases);
      }
    } else if (className === 'deathsChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].deaths);
      }
    } else if (className === 'recoveredChart') {
      for (let index in this.statesData) {
        data.push(this.statesData[index].recovered);
      }
    }

    //to use some variable inside anonymous functions , as only arrow fns have that acces
    //let self = this;

    let chart = d3.select(`.${className}`);
    let width = chart.style('width');
    let height = chart.style('height');

    let radius = d3.min([parseFloat(width), parseFloat(height)]) * 0.3;

    let svg = chart.append('svg').attr('width', width).attr('height', height);

    let g = svg
      .append('g')
      .attr(
        'transform',
        `translate(${parseFloat(width) / 2}, ${parseFloat(height) / 2})`
      );

    let pie = d3.pie().sort(null);

    console.log(pie(data));

    let arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .padAngle(0.02);

    let arcs = g
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    let path = arcs
      .append('path')
      .attr('fill', (d, i) => this.colors[i])
      .attr('d', <any>arc)
      .append('title')
      .text((d: any, i: number) => this.stateNamesList[i] + ' : ' + d.data);

    /* let centers = [];

    arcs.each(function (d: any) {
      centers.push(arc.centroid(d));
    });

    console.log(centers);

    arcs
      .append('text')
      .attr('x', function (d: any, i: number) {
        if (i === 0) {
          return centers[i][0] + parseFloat(width) * 0.0585651537;
        } else if (i === 1 || i === 3) {
          return centers[i][0] - parseFloat(width) * 0.0878477306;
        } else if (i === 2) {
          return centers[i][0] - parseFloat(width) * 0.1416412884;
        }
        return centers[i][0];
      })
      .attr('y', function (d: any, i: number) {
        if (i === 1) {
          return centers[i][1] + parseFloat(height) * 0.13187045;
        } else if (i === 3) {
          return centers[i][1] - parseFloat(height) * 0.0989028379;
        }
        return centers[i][1];
      })
      .text(function (d: any) {
        return d.data;
      })
      .style('fill', '#fff')
      .style('font-weight', '400'); */
  }

  /* mouseoverFunction(event: Event, d: any) {
    console.log(event);
    console.log(d);
    console.log(d3.pointer(event));
    const position = d3.pointer(event);
     d3.select('.container')
      .append('div')
      .classed('toolTipMain', true)
      .style('left', position[0] + 'px')
      .style('top', position[1] + 'px')
      .text(d.data); 
  }*/

  drawBarChart(className: string) {
    (<HTMLElement>document.querySelector(`.${className}`)).innerText = '';
    let data = [];

    if (className === 'confirmedChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].confirmedCases;
        data.push(tempObj);
      }
    } else if (className === 'deathsChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].deaths;
        data.push(tempObj);
      }
    } else if (className === 'recoveredChart') {
      for (let index in this.statesData) {
        let tempObj = {};
        tempObj['name'] = this.statesData[index].stateName;
        tempObj['value'] = this.statesData[index].recovered;
        data.push(tempObj);
      }
    }

    //to use some variable inside anonymous functions , as only arrow fns have that acces
    //let self = this;

    let chart = d3.select(`.${className}`);
    let width = chart.style('width');
    let height = chart.style('height');

    let svg = chart.append('svg').attr('height', height).attr('width', width);

    let g = svg.append('g').attr('transform', 'translate(10,10)');

    let xScale = d3
      .scaleBand()
      .range([0, parseFloat(width) - 20])
      .padding(0.4);

    let yScale = d3.scaleLinear().range([parseFloat(height) - 20, 0]);

    xScale.domain(
      data.map(function (d) {
        return d.name;
      })
    );

    yScale.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }) +
        d3.max(data, function (d) {
          return d.value;
        }) /
          10,
    ]);

    /* g.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${parseFloat(height) - 30})`)
      .call(d3.axisBottom(xScale)); */

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return xScale(d.name);
      })
      .attr('y', function (d) {
        return yScale(d.value);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', function (d) {
        return parseFloat(height) - 30 - yScale(d.value);
      })
      .attr('fill', (d, i) => this.colors[i]);

    g.selectAll('.text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', function (d) {
        return xScale(d.name);
      })
      .attr('y', function (d) {
        return yScale(d.value) - 10;
      })
      .text(function (d) {
        return d.value;
      })
      .style('fill', '#fff');

    /* d3.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', '#D3D3D3')
      .style('shape-rendering', 'crispEdges');

    d3.selectAll('.axis line').remove();
    d3.selectAll('.axis text').remove(); */
  }

  onHomeClick() {
    this.router.navigate(['../', 'view'], { relativeTo: this.route });
  }
}
