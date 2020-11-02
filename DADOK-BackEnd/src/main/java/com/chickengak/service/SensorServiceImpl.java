package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.Sensor;
import com.chickengak.mapper.SensorMapper;
@Service
public class SensorServiceImpl implements SensorService{
	
	@Autowired
	SensorMapper mapper;
	
	@Override
	public Sensor[] selectDataByUserNo(int user_no) throws Exception {
		return mapper.selectDataByUserNo(user_no);
	}

	@Override
	public int insertData(Sensor data) throws Exception {
		return mapper.insertData(data);
	}

	@Override
	public int updateData(Sensor data) throws Exception {
		return mapper.updateData(data);
	}

	@Override
	public int deleteData(int user_no) throws Exception {
		Sensor[] dataArr = mapper.selectDataByUserNo(user_no);
		int len = dataArr.length;
		int result = 0;
		for(Sensor sensor : dataArr) {
			result += mapper.deleteData(sensor.getNo());
		}
		return result == len ? 1 : 0;
	}
	
}
