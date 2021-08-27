package com.covidtracker.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.covidtracker.demo.entity.Guest;
import com.covidtracker.demo.service.GuestServiceImpl;

@RestController
@RequestMapping("/guest")
@CrossOrigin("http://localhost:4200")
public class GuestController {

	@Autowired
	private GuestServiceImpl guestService;
	
	@PostMapping("/login")
	public ResponseEntity<?> guestLogin(@RequestBody Guest guest){
		
		if(guestService.addGuest(guest)!=null) {
			return new ResponseEntity<String>("Logged In Succesfully", HttpStatus.OK);
		}else {
			return new ResponseEntity<String>("Please Enter a Valid Email", HttpStatus.NOT_FOUND);
		}
	}
	
}
