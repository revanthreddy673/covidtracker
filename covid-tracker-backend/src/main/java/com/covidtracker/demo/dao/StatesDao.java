package com.covidtracker.demo.dao;

import java.util.List;

import com.covidtracker.demo.entity.States;

public interface StatesDao {
	
	void addTotalCases(States states);
	
	List<States> getCasesByStates();
	
	States getStateCasesByID(int id);
	
	void deleteStateByID(int id);
	
	int getStateID(String state);
	
	List<String> getAllStates();
}
