package com.covidtracker.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.covidtracker.demo.entity.Admin;
import com.covidtracker.demo.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("http://localhost:4200")
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginAdmin(@RequestBody Admin admin){
		if(adminService.loginAdmin(admin)) {
			return new ResponseEntity<String>("Logged In Succesfully", HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Email/Password is not correct", HttpStatus.NOT_FOUND);
		}
	}
	
}
