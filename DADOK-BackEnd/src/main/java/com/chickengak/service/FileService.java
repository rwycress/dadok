package com.chickengak.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.chickengak.dto.FileInfo;
import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;
import com.chickengak.mapper.FileMapper;
import com.chickengak.mapper.UserMapper;
import com.chickengak.util.FileUtil;
@Service
public class FileService {
	@Autowired
	FileMapper mapper;
	@Autowired
	UserMapper umapper;
	
	private final Path root = Paths.get("uploads");

	  public List<FileInfo> save(PublicBoard board) throws Exception{
//		  System.out.println("root " + root.getRoot());
//		  System.out.println(root.getParent());
		MultipartFile[] files = board.getFiles();
//		System.out.println("service " + files);
		int no = board.getNo();
//		Date date = new Date().parse(board.getCreate_at());
		Date date = board.getCreate_at();
		if(date ==null) date = new Date();
		//저장할 디렉토리 경로 생성
		StringBuilder sb = new StringBuilder();
		sb
			.append(root)
			.append(File.separator)
			.append(date.getYear()+1900)
			.append(File.separator)
			.append(date.getMonth()+1)
			.append(File.separator)
			.append(date.getDate())
			.append(File.separator)
			.append(board.getNo())
			.append(File.separator);
		//파일시스템에 보드 넘버로 저장되어 있는 파일들 삭제 
		File dir = new File(sb.toString());
		if(dir.listFiles() != null) {
			Stream.of(dir.listFiles()).forEach(f->{
				f.delete();
			});
			dir.delete();
		}
		//경로가 존재하지 않으면 생성
		if(!dir.exists())
			dir.mkdirs();
		
		//기존에 보드 넘버로 데이터베이스에 저장되어 있던 파일들 삭제.
		mapper.deleteFileInfoByBoardNo((board.getNo()));
		
		//반환할 변수
		List<FileInfo> list = new ArrayList<>();
		
		//받은 파일 리스트에서 각 파일별로 저장
		Stream.of(files).forEach(file ->{
			//파일인포 데이터베이스에 넣을 객체
			FileInfo info = new FileInfo();
			//원본명 저장
			info.setOriginalname(FilenameUtils.getBaseName(file.getOriginalFilename()));
			//확장자 저장
			info.setExt(FilenameUtils.getExtension(file.getOriginalFilename()));
			//기존에 폴더가 존재했다면 제거
			
			//저장명 (랜덤스트링)
			String saveName = FileUtil.getRandomString();
			//저장경로
			Path path = Paths.get(sb.toString() +saveName + "." + info.getExt());
			//파일을 다운 받을 수 있는 url 생성
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/file/download/")
					.path(Integer.toString(no))
					.path("/")
					.path(saveName)
					.toUriString();
			//디렉토리 정보 저장
			info.setDir(dir.getPath());
			//저장명 저장
			info.setSavename(saveName);
			//url저장
			info.setUrl(fileDownloadUri);
			//보드타입 입력
			info.setType(1);
			// 보드번호 입력
			info.setBoard_no(board.getNo());
			try {
				//파일 복사
				Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
				//디비에 입력
				mapper.insertFileInfo(info);
				list.add(info);
			} catch (Exception e) {
				throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
			}
		});
		return list;
	  }
	  
	  public FileInfo profileSave(MultipartFile file, User user) throws Exception{
		Path profileroot = Paths.get("profile");
		String strDate =user.getJoin_date();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date = sdf.parse(strDate);
		
		if(date ==null) date = new Date();
		//저장할 디렉토리 경로 생성
		StringBuilder sb = new StringBuilder();
		sb
			.append(profileroot)
			.append(File.separator)
			.append(date.getYear()+1900)
			.append(File.separator)
			.append(date.getMonth()+1)
			.append(File.separator)
			.append(date.getDate())
			.append(File.separator)
			.append(user.getNo())
			.append(File.separator);
		//파일시스템에 보드 넘버로 저장되어 있는 파일들 삭제 
		File dir = new File(sb.toString());
		if(dir.listFiles() != null) {
			Stream.of(dir.listFiles()).forEach(f->{
				f.delete();
			});
			dir.delete();
		}
		//경로가 존재하지 않으면 생성
		if(!dir.exists())
			dir.mkdirs();
		
		//기존에 보드 넘버로 데이터베이스에 저장되어 있던 파일들 삭제.
		mapper.deleteFileInfoByUserNo((user.getNo()));
		
			//파일인포 데이터베이스에 넣을 객체
			FileInfo info = new FileInfo();
			//원본명 저장
			info.setOriginalname(FilenameUtils.getBaseName(file.getOriginalFilename()));
			//확장자 저장
			info.setExt(FilenameUtils.getExtension(file.getOriginalFilename()));
			//기존에 폴더가 존재했다면 제거
			
			//저장명 (랜덤스트링)
			String saveName = FileUtil.getRandomString();
			//저장경로
			Path path = Paths.get(sb.toString() +saveName + "." + info.getExt());
			//파일을 다운 받을 수 있는 url 생성
			String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
					.path("/file/download/profile/")
					.path(Integer.toString(user.getNo()))
					.path("/")
					.path(saveName)
					.toUriString();
			//디렉토리 정보 저장
			info.setDir(dir.getPath());
			//저장명 저장
			info.setSavename(saveName);
			//url저장
			info.setUrl(fileDownloadUri);
			//보드타입 입력
			info.setType(2);
			// 보드번호 입력
			info.setBoard_no(user.getNo());
			try {
				//파일 복사
				Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
				//디비에 입력
				mapper.insertFileInfo(info);
			} catch (Exception e) {
				throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
			}
		user.setProfile(info.getUrl());
		umapper.updateUserProfile(user);
		return info;
	  }

	  public FileInfo getInfo(FileInfo info) throws Exception {
		  return mapper.select(info);
	  }
	  public Integer getNo(FileInfo info) throws Exception {
		  return mapper.select(info).getNo();
	  }
	  public Integer delete(int board_no) throws Exception {
		  return mapper.deleteFileInfoByBoardNo(board_no);
	  }
	  /**
	   * 
	   * @param board_no 첨부파일 얻을 게시판 번호
	   * @return	파일 정보들	
	 * @throws Exception 
	   */
	  public FileInfo[] getfileinfos(int board_no) throws Exception {
		  return mapper.selectByBoardNo(board_no);
	  }
}
