package com.chickengak.service;

import com.chickengak.dto.SeatInfo;

public interface SeatInfoService {
	SeatInfo[] selectsSeatInfo    () throws Exception;
	SeatInfo[] selectByFranchisee (SeatInfo info) throws Exception;
	Integer insertSeatInfo (SeatInfo info) throws Exception;
	Integer updateSeatInfo (SeatInfo info) throws Exception;
	Integer deleteSeatInfo (int no) throws Exception;

}
