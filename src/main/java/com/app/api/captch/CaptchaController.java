package com.app.api.captch;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.app.model.captcha.CaptchaDetails;

/** @author in579prason */
@RestController
@RequestMapping(value = "/captcha", produces = MediaType.APPLICATION_JSON_VALUE)
public class CaptchaController {

	@Autowired
	private CaptchaService captchaService;

	/** This Method Loads/Reloads Captcha.
	 * 
	 * @return CaptchaDetails captchaImage,captchaStr,captchaKey */
	@RequestMapping(value = "/loadcaptcha", method = RequestMethod.GET)
	public CaptchaDetails loadCaptcha(HttpServletRequest request) {
		return captchaService.loadCaptcha();
	}

}
