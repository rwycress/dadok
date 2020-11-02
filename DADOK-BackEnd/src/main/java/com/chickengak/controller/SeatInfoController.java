package com.chickengak.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chickengak.dto.Reservation;
import com.chickengak.dto.SeatInfo;
import com.chickengak.service.ReservationService;
import com.chickengak.service.SeatInfoService;
import com.chickengak.util.MYUtil;

import io.swagger.annotations.ApiOperation;
@CrossOrigin
@RestController
public class SeatInfoController {
	
	@Autowired
	SeatInfoService seatinfo;
	@Autowired
	ReservationService resv;
	@ApiOperation(value= "모든 좌석 정보 반환", response = SeatInfo.class)
	@GetMapping("seatinfo/all")
	public ResponseEntity<SeatInfo[]> getAllSeatInfo(){
		//모든 좌석 정보 리턴
		SeatInfo[] infos;
		try {
			infos = seatinfo.selectsSeatInfo();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좌석정보 받기 실패");
		}
		return infos != null ? 
				new ResponseEntity<SeatInfo[]>(infos, HttpStatus.OK) : 
					new ResponseEntity<SeatInfo[]>(infos, HttpStatus.NO_CONTENT);
	}
	@ApiOperation(value= "프랜차이즈 번호로 속한 좌석들을 반환받음", response = SeatInfo.class)
	@GetMapping("seatinfo/fran")
	public ResponseEntity<SeatInfo[]> getSeatsByFranchisee(  SeatInfo info){
		//프랜차이즈 번호로 프랜차이즈에 속한 좌석들 모두 리턴받기
		SeatInfo[] infos;
		try {
			infos = seatinfo.selectByFranchisee(info);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("프랜차이즈 번호로 좌석정보 받기 실패");
		}
		return infos != null ? 
				new ResponseEntity<SeatInfo[]>(infos, HttpStatus.OK) : 
					new ResponseEntity<SeatInfo[]>(infos, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="날짜와 좌석 번호로 예약정보 받아오기 예시)좌석번호1 날짜는 오늘 = 오늘 해당 좌석의 예약들을 모두 반환", response = Reservation.class)
	@GetMapping("resv/seat/date")
	public ResponseEntity<Reservation[]> getReservationBySeatNoAndDate(@RequestParam int seat_no,@RequestParam  String date){
		//좌석 번호와 날짜로 해당일에 해당 좌석의 예약들을 리턴
		//시간 형식 맞추기.
		if(date == null) date = new SimpleDateFormat("yyyy.MM.dd").format(new Date());
//		else date = new SimpleDateFormat("yy-MM-dd").format(date);
		Reservation[] res;
		try {
			res = resv.selectReservationByDay(seat_no, date);
			if(res != null) {
				for(Reservation r : res) {
					r.setStart(MYUtil.changeTimeFormat(r.getStart()));
					r.setEnd(MYUtil.changeTimeFormat(r.getEnd()));
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좌석 번호로 해당 날짜 예약 받기 실패");
		}
		return res != null ? 
				new ResponseEntity<Reservation[]>(res, HttpStatus.OK) : 
					new ResponseEntity<Reservation[]>(res, HttpStatus.NO_CONTENT);
	}
	@ApiOperation(value="날짜+시간과 프랜차이즈번호로 예약정보 받아오기 예시)11시 프랜차이즈1번 가맹점의 예약점보 전체 얻기", response = Reservation.class)
	@GetMapping("resv/fran/time")
	public ResponseEntity<Reservation[]> getReservationByFranchiseeNoAndDateTime(@RequestParam  int franchisee_no, @RequestParam String datetime){
		//프랜차이즈 번호와 시간을 받아서 해당 시간에 프랜차이즈가맹점의 예약들을 리턴
		//시간 형식 맞추기.
		if(datetime == null) datetime = new SimpleDateFormat("yyyy.MM.dd.hh").format(new Date().parse(datetime));
//		else datetime = new SimpleDateFormat("yy-MM-dd-hh").format(datetime);
		Reservation[] res;
		try {
			res = resv.selectReservationByDateTime(franchisee_no, datetime);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("가맹점의 특정 시간대 예약 정보 반환 실패");
		}
		return res != null ? 
				new ResponseEntity<Reservation[]>(res, HttpStatus.OK) : 
					new ResponseEntity<Reservation[]>(res, HttpStatus.NO_CONTENT);
	}
	
	@ApiOperation(value="유저 번호 넘겨주면 현재 시간 기준으로 유저번호로 예약 된 것들 반환.", response = Reservation.class)
	@GetMapping("resv/user/{no}")
	public ResponseEntity getUserReservationNow(@PathVariable Integer no, String datetime) {
		try {
			Reservation[] resvs = resv.selectReservationByUserNow(no, datetime);
			return resvs != null ? ResponseEntity.ok(resvs)
					: ResponseEntity.noContent().build();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
	
	
	@PostMapping("resv")
	public ResponseEntity<String> insertReservation( @RequestBody Reservation reservation){
		//시작 시간, 끝시간 순서 체크해야됨
		int result;
		try {
			result = resv.insertReservation(reservation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("예약 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	@PutMapping("resv")
	public ResponseEntity<String> updateReservation(@RequestBody Reservation reservation){
		int result;
		try {
			result = resv.updateReservation(reservation);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("예약 수정 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	@DeleteMapping(path = "resv/{no}")
	public ResponseEntity<String> deleteReservation(@PathVariable Integer no) {
		int result;
		try {
			result = resv.deleteReservation(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("예약 취소 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("seat")
	public ResponseEntity<String> insertSeatInfo(@RequestBody SeatInfo info){
		int result;
		try {
			result = seatinfo.insertSeatInfo(info);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좌석 정보 추가 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	@PutMapping("seat")
	public ResponseEntity<String> updateSeatInfo(@RequestBody SeatInfo info){
		int result;
		try {
			result = seatinfo.updateSeatInfo(info);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좌석 정보 수정 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
	@DeleteMapping("seat")
	public ResponseEntity<String> deleteSeatInfo( @RequestBody int no) {
		int result;
		try {
			result = seatinfo.deleteSeatInfo(no);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new RuntimeException("좌석 정보 삭제 실패");
		}
		return result != 0 ? 
				new ResponseEntity<String>("success", HttpStatus.OK) : 
					new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
	}
}
