package com.chickengak.service;

import com.chickengak.dto.Sensor;

public interface SensorService {
	Sensor[] 	selectDataByUserNo   (int user_no) throws Exception;
	int 		insertData           (Sensor data) throws Exception;
	int 		updateData           (Sensor data) throws Exception;
	int 		deleteData           (int user_no) throws Exception;
}
