package com.covidtracker.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.covidtracker.demo.entity.States;
import com.covidtracker.demo.excelutil.ExcelUtil;
import com.covidtracker.demo.service.MonthlyCasesServiceImpl;
import com.covidtracker.demo.service.StatesService;

@RestController
@CrossOrigin("http://localhost:4200")
public class TrackerAddController {

	@Autowired
	private StatesService statesService;

	@Autowired
	private ExcelUtil excelUtil;

	@Autowired
	private MonthlyCasesServiceImpl monthlyCasesService;

	// get all states cases
	@GetMapping("/states")
	public List<States> getAllStatesCases() {
		return statesService.getCasesByStates();
	}

	// get state case by id
	@GetMapping("/states/{id}")
	public States getSatesById(@PathVariable int id) {
		return statesService.getStateCasesByID(id);
	}

	// update state cases
	@PutMapping("/states")
	public States updateStateCases(@RequestBody States state) {
		statesService.addTotalCases(state);
		return state;
	}

	// add state cases
	@PostMapping("/states")
	public States addStateCases(@RequestBody States state) {
		statesService.addTotalCases(state);
		return state;
	}

	// delete state by id
	@DeleteMapping("/states/{id}")
	public ResponseEntity<?> deleteStateByID(@PathVariable int id) {
		statesService.deleteStateByID(id);
		return new ResponseEntity<String>("Deleted Successfully", HttpStatus.OK);
	}

	// get id of a state
	@PostMapping("/states/{state}")
	public Integer getStateID(@PathVariable String state) {
		return statesService.getStateID(state);
	}

	@GetMapping("/statenames")
	public List<String> getAllStates() {
		return statesService.getAllStateNames();
	}

	/******** reading from excel and store in DB ***************/

	@PostMapping("/covidcases")
	public ResponseEntity<?> addCovidCases() {
		excelUtil.readExcelData();
		return new ResponseEntity<String>("Added Successfully", HttpStatus.OK);
	}

	@PostMapping("/monthlycases")
	public ResponseEntity<?> getMonthlyCases() {
		monthlyCasesService.getMonthlyCases();
		return new ResponseEntity<String>("Monthly Cases Added Successfully", HttpStatus.OK);
	}

}
