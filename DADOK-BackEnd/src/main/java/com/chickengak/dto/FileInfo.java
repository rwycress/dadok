package com.chickengak.dto;

public class FileInfo {
	private Integer no;
	private String originalname;
	private String savename;
	private String dir;
	private String url;
	private String ext;
	private Integer type;
	private Integer board_no;
	public Integer getNo() {
		return no;
	}
	public FileInfo setNo(Integer no) {
		this.no = no;
		return this;
	}
	public String getOriginalname() {
		return originalname;
	}
	public FileInfo setOriginalname(String originalname) {
		this.originalname = originalname;
		return this;
	}
	public String getSavename() {
		return savename;
	}
	public FileInfo setSavename(String savename) {
		this.savename = savename;
		return this;
	}
	public String getDir() {
		return dir;
	}
	public FileInfo setDir(String dir) {
		this.dir = dir;
		return this;
	}
	public String getUrl() {
		return url;
	}
	public FileInfo setUrl(String url) {
		this.url = url;
		return this;
	}
	public String getExt() {
		return ext;
	}
	public FileInfo setExt(String ext) {
		this.ext = ext;
		return this;
	}
	@Override
	public String toString() {
		return "FileInfo [no=" + no + ", originalname=" + originalname + ", savename=" + savename + ", dir=" + dir
				+ ", url=" + url + ", ext=" + ext + "]";
	}
	public FileInfo(Integer no, String originalname, String savename, String dir, String url, String ext) {
		super();
		this.no = no;
		this.originalname = originalname;
		this.savename = savename;
		this.dir = dir;
		this.url = url;
		this.ext = ext;
	}
	public FileInfo() {
		super();
	}
	/**
	 * @return the board_no
	 */
	public Integer getBoard_no() {
		return board_no;
	}
	/**
	 * @param board_no the board_no to set
	 */
	public FileInfo setBoard_no(Integer board_no) {
		this.board_no = board_no;
		return this;
	}
	/**
	 * @return the type
	 */
	public Integer getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public FileInfo setType(Integer type) {
		this.type = type;
		return this;
	}
	
}
