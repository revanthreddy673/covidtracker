package com.covidtracker.demo.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.AdminDao;
import com.covidtracker.demo.entity.Admin;

@Service
public class AdminServiceImpl implements AdminService {

	@Autowired
	private AdminDao adminDao;
	
	@Override
	@Transactional
	public boolean loginAdmin(Admin admin) {
		return adminDao.loginAdmin(admin);
	}

}
