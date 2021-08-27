package com.covidtracker.demo.dao;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.MonthlyCases;

@Repository
public interface MonthlyCasesDao extends JpaRepository<MonthlyCases, Integer>{

}
