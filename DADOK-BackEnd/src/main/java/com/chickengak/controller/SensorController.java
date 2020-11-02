package com.chickengak.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.Sensor;
import com.chickengak.service.SensorService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/sensors")
public class SensorController {
	private static final Logger logger = LoggerFactory.getLogger(Sensor.class);
	
	private final String SUCCESS = "success";
	private final String FAIL = "fail";
	
	@Autowired
	SensorService service;
	
	@ApiOperation(value = "센서 정보 저장", response = String.class)
	@PostMapping
	public ResponseEntity<String> saveData(@RequestBody Sensor data){
		System.out.println(data);
		logger.debug("save" + data.toString());
		
		try {
			return service.insertData(data) != 0 ? 
					new ResponseEntity<String>(SUCCESS, HttpStatus.OK) : 
						new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("센서정보 저장 실패");
		}
	}
	
	@ApiOperation(value = "센서 정보 수정", response = String.class)
	@PutMapping
	public ResponseEntity<String> modify(Sensor data){
		try {
			return service.updateData(data) != 0 ? 
					new ResponseEntity<String>(SUCCESS, HttpStatus.OK) : 
						new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("센서 정보 수정 실패");
		}
	}
	@ApiOperation(value = "특정 유저의 센서 정보 전체 삭제", response = String.class)
	@DeleteMapping
	public ResponseEntity<String> delete(int user_no){
		try {
			return service.deleteData(user_no) != 0 ? 
					new ResponseEntity<String>(SUCCESS, HttpStatus.OK) : 
						new ResponseEntity<String>(FAIL, HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("센서정보 삭제 실패");
		}
	}
	@ApiOperation(value = "원하는 유저의 센서정보 반환", response = Sensor.class)
	@GetMapping
	public ResponseEntity<Sensor[]> getDatas(int user_no){
		Sensor[] datas;
		try {
			datas = service.selectDataByUserNo(user_no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("센서 정보 받기 실패");
		}
		return datas != null ? 
				new ResponseEntity<Sensor[]>(datas, HttpStatus.OK) : 
					new ResponseEntity<Sensor[]>(datas, HttpStatus.NO_CONTENT);
	}
	
	
}
