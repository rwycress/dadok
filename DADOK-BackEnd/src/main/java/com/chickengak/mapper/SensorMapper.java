package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Sensor;
@Mapper
public interface SensorMapper {
	Sensor[] 	selectDataByUserNo   (int user_no) throws Exception;
	int 		insertData           (Sensor data) throws Exception;
	int 		updateData           (Sensor data) throws Exception;
	int 		deleteData           (int no) throws Exception;
}
