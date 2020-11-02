package com.chickengak.jwt;

import java.security.Key;
import java.util.HashMap;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	
	private final String secretKey = "chickengakgumi0308soakaeofhwjrsmsqlalfzlek";
	
	public boolean isValidate(String jwt) {
		if (jwt == null) return false;
		return false;
	}
	
	public boolean isExpired(String jwt) {
		return true;
	}
	
	public HashMap<String, Object> getToken(String str) {
		
		return null;
	}
	
	public HashMap<String, Object> getRefreshToken(){
		
		return null;
	}
	
	public static void main(String[] args) {
		Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
		
		String jws = Jwts.builder().setSubject("chickengak").signWith(key).compact();
		System.out.println(jws);
		System.out.println(Jwts.parser().setSigningKey(key).parseClaimsJws(jws).getBody().getSubject().equals("chickengak"));
	}
}
