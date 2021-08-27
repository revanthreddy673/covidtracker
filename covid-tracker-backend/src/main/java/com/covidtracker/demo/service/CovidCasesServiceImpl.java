package com.covidtracker.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.CovidCasesDao;
import com.covidtracker.demo.entity.CovidCases;

@Service
public class CovidCasesServiceImpl {

	@Autowired
	private CovidCasesDao covidCasesDao;
	
	public CovidCases addCovidCases(CovidCases covidCases) {
		return covidCasesDao.save(covidCases);
	}
}
