package com.chickengak.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.chickengak.dto.Reservation;
@Mapper
public interface ReservationMapper {
	Reservation[] selectReservations          () throws Exception;
	Reservation[] selectReservationByDay      (int seat_no, String date) throws Exception;
	Reservation[] selectReservationByDateTime (int franchisee_no, String date) throws Exception;
	Integer insertReservation           (Reservation reservation) throws Exception;
	Integer updateReservation           (Reservation reservation) throws Exception;
	Integer deleteReservation           (int no) throws Exception;
	Reservation[] selectReservationByUserNow(int user_no, String datetime) throws Exception;
}
