package com.chickengak.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chickengak.dto.Reservation;
import com.chickengak.mapper.ReservationMapper;
import com.chickengak.util.MYUtil;
import com.google.common.collect.Collections2;
@Service
public class ReservationServiceImpl implements ReservationService{
	
	@Autowired
	ReservationMapper mapper;
	
	@Override
	public Reservation[] selectReservations() throws Exception {
		return mapper.selectReservations();
	}

	@Override
	public Reservation[] selectReservationByDay(int seat_no, String date) throws Exception {
		return mapper.selectReservationByDay(seat_no, date);
	}

	@Override
	public Reservation[] selectReservationByDateTime(int franchisee_no, String date) throws Exception {
		return mapper.selectReservationByDateTime(franchisee_no, date);
	}

	@Override
	public Integer insertReservation(Reservation reservation) throws Exception {
		//시작시간 검사 넣기
		//끝나는 시간도
		List<Reservation> resvlist = 
				Stream.of(mapper.
					selectReservationByDay(reservation.getSeat_no(), reservation.getStart()))
				.filter(resv ->
					MYUtil.timeCheck(resv.getStart(), resv.getEnd(), reservation.getStart(), reservation.getEnd())
														)
				.collect(Collectors.toList());
		System.out.println(reservation);
		System.out.println();
		resvlist.forEach(System.out::println);
		if(resvlist.size() > 0) {
			return 0;
		}
		return mapper.insertReservation(reservation);
	}

	@Override
	public Integer updateReservation(Reservation reservation) throws Exception {
		return mapper.updateReservation(reservation);
	}

	@Override
	public Integer deleteReservation(int no) throws Exception {
		return mapper.deleteReservation(no);
	}
	
	@Override
	public Reservation[] selectReservationByUserNow(Integer user_no, String datetime) throws Exception {
		return mapper.selectReservationByUserNow(user_no, datetime);
	}
	
}
