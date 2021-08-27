package com.covidtracker.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.covidtracker.demo.entity.MonthlyCases;
import com.covidtracker.demo.service.MonthlyCasesServiceImpl;

@RestController
@CrossOrigin("http://localhost:4200")
public class MonthlyCasesController {
	
	@Autowired
	private MonthlyCasesServiceImpl monthlyCasesService;
	
	@GetMapping("/monthlycases/{name}")
	public ResponseEntity<?> getMonthlyCasesByRegion(@PathVariable String name){
		
		List<MonthlyCases> monthlyCasesList= monthlyCasesService.getMonthlyCasesByRegion(name);
		
		if(monthlyCasesList!=null && !monthlyCasesList.isEmpty()) {
			return new ResponseEntity<List<MonthlyCases>>(monthlyCasesList, HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Something Went Wrong", HttpStatus.NOT_FOUND);
		}
		
	}
}
