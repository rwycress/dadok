package com.chickengak.service;

import com.chickengak.dto.Reservation;

public interface ReservationService {
	Reservation[] selectReservations          () throws Exception;
	Reservation[] selectReservationByDay      (int seat_no, String date) throws Exception;
	Reservation[] selectReservationByDateTime (int franchisee_no, String date) throws Exception;
	Integer insertReservation           (Reservation reservation) throws Exception;
	Integer updateReservation           (Reservation reservation) throws Exception;
	Integer deleteReservation           (int no) throws Exception;
	Reservation[] selectReservationByUserNow(Integer user_no, String datetime) throws Exception;
}
