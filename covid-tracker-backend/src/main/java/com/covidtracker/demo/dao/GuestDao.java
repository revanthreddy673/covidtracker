package com.covidtracker.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.Guest;

@Repository
public interface GuestDao extends JpaRepository<Guest, Integer>{

	
}
