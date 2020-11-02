package com.chickengak.util;

public class PageBean {
	Integer page;
	Integer interval;
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getInterval() {
		return interval;
	}
	public void setInterval(Integer interval) {
		this.interval = interval;
	}
	@Override
	public String toString() {
		return "PageBean [page=" + page + ", interval=" + interval + "]";
	}
}
