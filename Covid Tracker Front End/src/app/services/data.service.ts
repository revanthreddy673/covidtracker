import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyUpdate } from '../modelclass/daily-update.model';
import { MonthlyCases } from '../modelclass/monthly-cases.model';
import { States } from '../modelclass/states.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  statesList: string[] = [];

  constructor(private http: HttpClient) {}

  addTotalCases(states: States) {
    return this.http.post<States>('http://localhost:8080/states', states);
  }

  updateDailyCases(dailyCases: DailyUpdate) {
    return this.http.post<DailyUpdate>(
      'http://localhost:8080/dailyupdate/add',
      dailyCases
    );
  }

  getStateNames() {
    return this.http.get<[string]>('http://localhost:8080/statenames');
  }

  //get all states data
  getAllStatesData() {
    return this.http.get<States[]>('http://localhost:8080/states');
  }

  statesListForCompare(selectedStates: string[]) {
    this.statesList = selectedStates;
  }

  getMonthlyCasesByRegion(name: string) {
    return this.http.get<MonthlyCases[]>(
      `http://localhost:8080/monthlycases/${name}`
    );
  }
}
