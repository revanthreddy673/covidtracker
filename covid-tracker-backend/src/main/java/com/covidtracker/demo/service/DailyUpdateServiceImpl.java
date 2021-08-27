package com.covidtracker.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.DailyUpdateDao;
import com.covidtracker.demo.entity.DailyUpdate;

@Service
public class DailyUpdateServiceImpl {

	@Autowired
	private DailyUpdateDao dailyUpdateDao;
	
	public DailyUpdate addDailyCasesForState(DailyUpdate dailyUpdate) {
		
		DailyUpdate dailyCases= dailyUpdateDao.save(dailyUpdate);
		
		return dailyCases;
	}
}
