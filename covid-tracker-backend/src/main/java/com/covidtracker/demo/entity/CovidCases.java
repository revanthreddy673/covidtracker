package com.covidtracker.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="covidcases")
@Data
public class CovidCases {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="month")
	private String month;
	
	@Column(name="year")
	private String year;
	
	@Column(name="region")
	private String region;
	
	@Column(name="confirmedcases")
	private Long confirmedCases;
	
	@Column(name="activecases")
	private Long activeCases;
	
	@Column(name="recovered")
	private Long recovered;
	
	@Column(name="deaths")
	private Long deaths;
}
