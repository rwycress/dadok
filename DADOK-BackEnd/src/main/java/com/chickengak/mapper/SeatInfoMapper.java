package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.SeatInfo;
@Mapper
public interface SeatInfoMapper {
	SeatInfo[] selectsSeatInfo    () throws Exception;
	SeatInfo[] selectByFranchisee (SeatInfo info) throws Exception;
	Integer insertSeatInfo (SeatInfo info) throws Exception;
	Integer updateSeatInfo (SeatInfo info) throws Exception;
	Integer deleteSeatInfo (int no) throws Exception;
	SeatInfo selectByFranchiseeNoAndFranchiseeSeatNo(int franchisee_no, int franchisee_seat_no) throws Exception;
}
