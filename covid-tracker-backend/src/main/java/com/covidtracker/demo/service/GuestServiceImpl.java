package com.covidtracker.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.covidtracker.demo.dao.GuestDao;
import com.covidtracker.demo.entity.Guest;

@Service
public class GuestServiceImpl {

	@Autowired
	private GuestDao guestDao;
	
	public Guest addGuest(Guest guest) {
		return guestDao.save(guest);
	}
}
