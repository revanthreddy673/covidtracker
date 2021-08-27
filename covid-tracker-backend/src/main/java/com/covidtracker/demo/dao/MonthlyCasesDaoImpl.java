package com.covidtracker.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.MonthlyCases;

@Repository
public class MonthlyCasesDaoImpl {

	@Autowired
	private EntityManager entityManager; 
	
	@SuppressWarnings("unchecked")
	public List<MonthlyCases> getMonthlyCasesByRegion(String name){
		
		Query query= entityManager.createQuery("select m from MonthlyCases m where m.region=:arg1");
		query.setParameter("arg1", name);
		
		List<MonthlyCases> list= query.getResultList();
		
		return list;
	}
}
