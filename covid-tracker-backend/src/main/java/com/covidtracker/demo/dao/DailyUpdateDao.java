package com.covidtracker.demo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.covidtracker.demo.entity.DailyUpdate;

@Repository
public interface DailyUpdateDao extends JpaRepository<DailyUpdate, Integer>{

}
