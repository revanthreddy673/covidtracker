package com.covidtracker.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.States;

@Repository
public class StatesDaoImpl implements StatesDao {

	@Autowired
	private EntityManager entityManager;
	
	@Override
	public void addTotalCases(States states) {
		
		entityManager.merge(states);
	}

	@Override
	public List<States> getCasesByStates() {
		
		TypedQuery<States> query= entityManager.createQuery("from States", States.class);
		
		List<States> statesList= query.getResultList();
		
		return statesList;
	}

	@Override
	public States getStateCasesByID(int id) {
		States state= entityManager.find(States.class, id);
		return state;
	}

	@Override
	public void deleteStateByID(int id) {
		
		Query query= entityManager.createQuery("delete from States where id=:stateID");
		
		query.setParameter("stateID", id);
		
		query.executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public int getStateID(String state) {
		
		Query query= entityManager.createQuery("select s.id from States s where s.stateName=:arg1");
		
		query.setParameter("arg1", state);
		
		List<Integer> list= query.getResultList();
		
		if(list!=null && !list.isEmpty()) {
			return list.get(0);
		}else {
			return 0;
		}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<String> getAllStates() {
		
		Query query= entityManager.createQuery("select s.stateName from States s");
		
		List<String> stateNames= query.getResultList();
		
		return stateNames;
	}	

}
