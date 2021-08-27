package com.covidtracker.demo.service;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.CovidCasesDao;
import com.covidtracker.demo.dao.MonthlyCasesDao;
import com.covidtracker.demo.dao.MonthlyCasesDaoImpl;
import com.covidtracker.demo.entity.CovidCases;
import com.covidtracker.demo.entity.MonthlyCases;

@Service
public class MonthlyCasesServiceImpl {

	@Autowired
	private MonthlyCasesDao monthlyCasesDao;
	
	@Autowired
	private CovidCasesDao covidCasesDao;
	
	@Autowired
	private MonthlyCasesDaoImpl monthlyCasesDaoImpl;
	
	public void getMonthlyCases() {
		
		List<CovidCases> covidCasesList= covidCasesDao.findAll();
		//map with state as key
		Map<String,List<CovidCases>> covidMap= getStateMap(covidCasesList);
		//map of map with state as outer key and month as inner key
		for(String region: covidMap.keySet()) {
			Map<String,List<CovidCases>> monthMap= getMonthsInStateMap(covidMap.get(region));
			for(String timePeriod: monthMap.keySet()) {
				List<CovidCases> list= monthMap.get(timePeriod);
				list.sort(Comparator.comparing(CovidCases::getConfirmedCases, Comparator.nullsFirst(Comparator.naturalOrder())));
				if(list!=null && !list.isEmpty()) {
					
					CovidCases covidCase= list.get(list.size()-1);
					
					MonthlyCases monthlyCase= new MonthlyCases();
					monthlyCase.setTimePeriod(timePeriod);
					monthlyCase.setRegion(region);
					monthlyCase.setConfirmedCases(covidCase.getConfirmedCases());
					monthlyCase.setActiveCases(covidCase.getActiveCases());
					monthlyCase.setRecovered(covidCase.getRecovered());
					monthlyCase.setDeaths(covidCase.getDeaths());
					
					monthlyCasesDao.save(monthlyCase);
				}
			}
		}
		
	}
	
	private static Map<String, List<CovidCases>> getStateMap(List<CovidCases> covidCasesList){
		Map<String,List<CovidCases>> covidMap= new LinkedHashMap<>();
		for(CovidCases covidCases: covidCasesList) {
			if(covidMap.containsKey(covidCases.getRegion())) {
				covidMap.get(covidCases.getRegion()).add(covidCases);
			}else {
				List<CovidCases> tempList= new LinkedList<>();
				tempList.add(covidCases);
				covidMap.put(covidCases.getRegion(), tempList);
			}
		}
		return covidMap;
	}
	
	private static Map<String, List<CovidCases>> getMonthsInStateMap(List<CovidCases> covidCasesList){
		Map<String,List<CovidCases>> covidMap= new LinkedHashMap<>();
		for(CovidCases covidCases: covidCasesList) {
			if(covidMap.containsKey(covidCases.getMonth())) {
				covidMap.get(covidCases.getMonth()).add(covidCases);
			}else {
				List<CovidCases> tempList= new LinkedList<>();
				tempList.add(covidCases);
				covidMap.put(covidCases.getMonth(), tempList);
			}
		}
		return covidMap;
	}
	
	public List<MonthlyCases> getMonthlyCasesByRegion(String name){
		return monthlyCasesDaoImpl.getMonthlyCasesByRegion(name);
	}
}
