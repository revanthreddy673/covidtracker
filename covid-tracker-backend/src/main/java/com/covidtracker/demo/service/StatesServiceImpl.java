package com.covidtracker.demo.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.StatesDao;
import com.covidtracker.demo.entity.States;

@Service
public class StatesServiceImpl implements StatesService {

	@Autowired
	private StatesDao statesDao;
	
	@Override
	@Transactional
	public void addTotalCases(States states) {
		statesDao.addTotalCases(states);
	}

	@Override
	@Transactional
	public List<States> getCasesByStates() {
		List<States> statesList= new ArrayList<>();
		
		statesList= statesDao.getCasesByStates();
		
		statesList.sort(Comparator.comparing(States::getConfirmedCases, Comparator.nullsFirst(Comparator.reverseOrder())));
		
		return statesList;
	}

	@Override
	@Transactional
	public States getStateCasesByID(int id) {
		States state= new States();
		state= statesDao.getStateCasesByID(id);
		return state;
	}

	@Override
	@Transactional
	public void deleteStateByID(int id) {
		statesDao.deleteStateByID(id);
	}

	@Override
	public int getStateID(String state) {
		return statesDao.getStateID(state);
	}

	@Override
	public List<String> getAllStateNames() {
		return statesDao.getAllStates();
	}

}
