package com.app.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.app.api.xss.filter.XSSFilter;

@EnableWebMvc
@Configuration
public class AppConfig extends WebMvcConfigurerAdapter {

	/** Anti cross-site scripting (XSS) filter on URLPatterns.
	 * 
	 * @return */
	@Bean
	public FilterRegistrationBean xssPreventFilter() {
		FilterRegistrationBean registrationBean = new FilterRegistrationBean();
		registrationBean.setFilter(new XSSFilter());
		registrationBean.addUrlPatterns("/api/*");
		return registrationBean;
	}
}
