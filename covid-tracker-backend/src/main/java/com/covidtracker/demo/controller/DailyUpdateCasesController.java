package com.covidtracker.demo.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.covidtracker.demo.entity.DailyUpdate;
import com.covidtracker.demo.entity.States;
import com.covidtracker.demo.service.DailyUpdateServiceImpl;
import com.covidtracker.demo.service.StatesService;

@RestController
@RequestMapping("/dailyupdate")
@CrossOrigin("http://localhost:4200")
public class DailyUpdateCasesController {
	
	@Autowired
	private DailyUpdateServiceImpl dailyUpdateService;
	
	@Autowired
	private StatesService stateService;

	@PostMapping("/add")
	public DailyUpdate addDailyCasesForState(@RequestBody DailyUpdate dailyUpdate) {
		dailyUpdate.setDate(new Date());
		
		//update total cases of a state
		if(stateService.getStateID(dailyUpdate.getStateName()) !=0) {
			States state= stateService.getStateCasesByID(stateService.getStateID(dailyUpdate.getStateName()));
			state.setConfirmedCases(state.getConfirmedCases()+dailyUpdate.getConfirmedCases());
			state.setDeaths(state.getDeaths()+dailyUpdate.getDeaths());
			state.setRecovered(state.getRecovered()+dailyUpdate.getRecovered());
			//call update method
			stateService.addTotalCases(state);
		}else {
			States state= new States();
			state.setId(-1);
			state.setStateName(dailyUpdate.getStateName());
			state.setConfirmedCases(dailyUpdate.getConfirmedCases());
			state.setDeaths(dailyUpdate.getDeaths());
			state.setRecovered(dailyUpdate.getRecovered());
			//since id is not found, add as a new entry
			stateService.addTotalCases(state);
		}
		
		return dailyUpdateService.addDailyCasesForState(dailyUpdate);
	}
	
}
