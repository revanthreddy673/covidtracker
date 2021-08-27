package com.covidtracker.demo.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.Admin;

@Repository
public class AdminDaoImpl implements AdminDao {

	@Autowired
	private EntityManager entityManager;
	
	@SuppressWarnings("unchecked")
	@Override
	public boolean loginAdmin(Admin admin) {
		
		Query query= entityManager.createQuery("select e from Admin e where e.email=:arg1 and e.password=:arg2");
		query.setParameter("arg1", admin.getEmail());
		query.setParameter("arg2", admin.getPassword());
		
		List<Admin> usersList= query.getResultList();
		
		if(usersList!=null && !usersList.isEmpty()) {
			return true;
		}
		
		return false;
	}

}
