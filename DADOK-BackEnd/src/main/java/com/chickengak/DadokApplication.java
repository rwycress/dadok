package com.chickengak;

import java.nio.charset.Charset;
/*
 http://localhost:9999/chickengak/swagger-ui.html
 
 aws
 i3d208.p.ssafy.io:9999/chickengak/swagger-ui.html
 */

import javax.servlet.Filter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.chickengak.config.FileUploadProperties;

@ComponentScan
@Configuration
@EnableAutoConfiguration
@SpringBootApplication
@EnableConfigurationProperties({
    FileUploadProperties.class
})
public class DadokApplication {

	public static void main(String[] args) {
		SpringApplication.run(DadokApplication.class, args);
	}
	
	@Bean
    public HttpMessageConverter<String> responseBodyConverter() {
        return new StringHttpMessageConverter(Charset.forName("UTF-8"));
    }

    @Bean
    public Filter characterEncodingFilter() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return characterEncodingFilter;
    }
    
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver commonsMultipartResolver(){
        return new CommonsMultipartResolver();
    }
    
    @ExceptionHandler({Exception.class})
    public void resolveException(Exception e) {
        e.printStackTrace();
    }

}
