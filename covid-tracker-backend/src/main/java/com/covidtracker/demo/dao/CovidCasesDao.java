package com.covidtracker.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.CovidCases;

@Repository
public interface CovidCasesDao extends JpaRepository<CovidCases, Integer>{

}
