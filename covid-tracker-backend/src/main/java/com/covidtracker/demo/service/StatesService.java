package com.covidtracker.demo.service;

import java.util.List;

import com.covidtracker.demo.entity.States;

public interface StatesService {
	
	void addTotalCases(States states);
	
	List<States> getCasesByStates();
	
	States getStateCasesByID(int id);
	
	void deleteStateByID(int id);
	
	int getStateID(String state);
	
	List<String> getAllStateNames();
	
}
