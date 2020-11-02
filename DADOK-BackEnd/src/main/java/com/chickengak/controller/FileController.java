package com.chickengak.controller;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chickengak.dto.FileInfo;
import com.chickengak.dto.PublicBoard;
import com.chickengak.dto.User;
import com.chickengak.service.FileService;
import com.chickengak.service.PublicBoardService;
import com.chickengak.service.UserService;
import com.chickengak.util.FileUtil;

@CrossOrigin
@RestController
@RequestMapping("file")
public class FileController {
	
	Path fileBasePath = Paths.get("uploads");
	
	@Autowired
	FileService service;
	
	@Autowired 
	PublicBoardService pbservice;
	@Autowired
	UserService uservice;
	
	@PostMapping(path = "upload/{board_no}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity upload(@RequestParam("files") List<MultipartFile> files, @PathVariable Integer board_no) {
		try {
			PublicBoard board = pbservice.detail(board_no);
			System.out.println(board);
			if(files != null) {
				board.setFiles( files.toArray(new MultipartFile[0]));
				System.out.println(files + " " + files.size());
			}
			else
				System.out.println("null---");
			service.save(board);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok("success");
	}
	
	@GetMapping("download/{no}/{filename}")
	public ResponseEntity download(@PathVariable String filename, @PathVariable Integer no, HttpServletRequest req) {
		//경로 저장할 변수
		StringBuilder sb = new StringBuilder();
		//받아올 보드의 
		PublicBoard board;
		try {
			board = pbservice.detail(no);
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new RuntimeException("게시글 읽기 실패");
		}
		Date date = board.getCreate_at();
		sb
			.append(fileBasePath)
			.append(File.separator)
			.append(date.getYear()+1900)
			.append(File.separator)
			.append(date.getMonth()+1)
			.append(File.separator)
			.append(date.getDate())
			.append(File.separator)
			.append(no)
			.append(File.separator);
		FileInfo info;
		try {
			info = service.getInfo(new FileInfo().setBoard_no(no).setSavename(filename).setType(1));
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new RuntimeException("첨부파일 읽기 실패");
		}
//		File file = new File(sb.toString() + filename + "." + info.getExt());
		File file = new File(info.getDir() + File.separator + info.getSavename() + "." + info.getExt());
		System.out.println(info);
		try {
			Resource resource = new UrlResource(file.toPath().toUri());
			System.out.println(resource);
			sb = new StringBuilder();
			sb.append("attachment;filename=")
				.append( info.getOriginalname())
				.append(".")
				.append( info.getExt())
				.append("; ")
				.append("filename*=utf-8\"");
			if (resource.exists() || resource.isReadable()) {
		        try {
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, FileUtil.setDisposition(info.getOriginalname() + "." + info.getExt(), req))
							.body(resource);
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException("Could not read the file!222");
				}
		      } else {
		        throw new RuntimeException("Could not read the file!");
		      }
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}
	
	@PostMapping(path = "upload/profile/{user_no}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity uploadProfile(@RequestParam("file") MultipartFile file, @PathVariable Integer user_no) {
		try {
//			User user = new User();
//			user.setNo(user_no);
			User user = uservice.selectJoinDateByUserNo(user_no);
			service.profileSave(file, user);
			
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok("success");
	}
	
	@GetMapping("download/profile/{user_no}/{filename}")
	public ResponseEntity downloadProfile(@PathVariable String filename, @PathVariable Integer user_no, HttpServletRequest req) {
		Path profileBasePath = Paths.get("profile");
		//경로 저장할 변수
		StringBuilder sb = new StringBuilder();
		User user = new User();
		try {
			user = uservice.selectJoinDateByUserNo(user_no);
		} catch (Exception e3) {
			e3.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		
		String strDate =user.getJoin_date();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date date;
		try {
			date = sdf.parse(strDate);
		} catch (ParseException e2) {
			// TODO Auto-generated catch block
			e2.printStackTrace();
			date = new Date();
		}
		sb
			.append(profileBasePath)
			.append(File.separator)
			.append(date.getYear()+1900)
			.append(File.separator)
			.append(date.getMonth()+1)
			.append(File.separator)
			.append(date.getDate())
			.append(File.separator)
			.append(user_no)
			.append(File.separator);
		FileInfo info;
		try {
			info = service.getInfo(new FileInfo().setBoard_no(user_no).setSavename(filename).setType(2));
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			throw new RuntimeException("첨부파일 읽기 실패");
		}
//		File file = new File(sb.toString() + filename + "." + info.getExt());
		File file = new File(info.getDir() + File.separator + info.getSavename() + "." + info.getExt());
		System.out.println(info);
		try {
			Resource resource = new UrlResource(file.toPath().toUri());
			System.out.println(resource);
			sb = new StringBuilder();
			sb.append("attachment;filename=")
				.append( info.getOriginalname())
				.append(".")
				.append( info.getExt())
				.append("; ")
				.append("filename*=utf-8\"");
			if (resource.exists() || resource.isReadable()) {
		        try {
					return ResponseEntity.ok()
							.header(HttpHeaders.CONTENT_DISPOSITION, FileUtil.setDisposition(info.getOriginalname() + "." + info.getExt(), req))
							.body(resource);
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException("Could not read the file!222");
				}
		      } else {
		        throw new RuntimeException("Could not read the file!");
		      }
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.badRequest().build();
	}

}
