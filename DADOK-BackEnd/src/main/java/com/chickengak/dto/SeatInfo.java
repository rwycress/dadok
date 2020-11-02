package com.chickengak.dto;

public class SeatInfo {
	Integer no;
	Integer franchisee_no;
	Integer franchisee_seat_no;
	@Override
	public String toString() {
		return "SeatInfo [no=" + no + ", franchisee_no=" + franchisee_no + ", franchisee_seat_no=" + franchisee_seat_no
				+ "]";
	}
	public Integer getNo() {
		return no;
	}
	public void setNo(Integer no) {
		this.no = no;
	}
	public Integer getFranchisee_no() {
		return franchisee_no;
	}
	public void setFranchisee_no(Integer franchisee_no) {
		this.franchisee_no = franchisee_no;
	}
	public Integer getFranchisee_seat_no() {
		return franchisee_seat_no;
	}
	public void setFranchisee_seat_no(Integer franchisee_seat_no) {
		this.franchisee_seat_no = franchisee_seat_no;
	}
	
}
