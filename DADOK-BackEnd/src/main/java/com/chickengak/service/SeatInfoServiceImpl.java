package com.chickengak.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.SeatInfo;
import com.chickengak.mapper.ReservationMapper;
import com.chickengak.mapper.SeatInfoMapper;
@Service
public class SeatInfoServiceImpl implements SeatInfoService{
	@Autowired
	SeatInfoMapper mapper;
	
	@Autowired
	ReservationMapper res;
	
	@Override
	public SeatInfo[] selectsSeatInfo() throws Exception {
		return mapper.selectsSeatInfo();
	}

	@Override
	public SeatInfo[] selectByFranchisee(SeatInfo info) throws Exception {
		return mapper.selectByFranchisee(info);
	}

	@Override
	public Integer insertSeatInfo(SeatInfo info) throws Exception {
		SeatInfo preInfo = mapper.selectByFranchiseeNoAndFranchiseeSeatNo(info.getFranchisee_no(), info.getFranchisee_seat_no());
		if(preInfo != null) return 0;
		return mapper.insertSeatInfo(info);
	}

	@Override
	public Integer updateSeatInfo(SeatInfo info) throws Exception {
		return mapper.updateSeatInfo(info);
	}

	@Override
	public Integer deleteSeatInfo(int no) throws Exception {
		return mapper.deleteSeatInfo(no);
	}



}
