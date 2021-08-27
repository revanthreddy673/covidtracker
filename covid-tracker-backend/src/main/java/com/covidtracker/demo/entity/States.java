package com.covidtracker.demo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="states")
@Data
public class States {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="state_name")
	private String stateName;
	
	@Column(name="confirmed")
	private Long confirmedCases;
	
	@Column(name="deaths")
	private Long deaths;
	
	@Column(name="recovered")
	private Long recovered;
	
}
