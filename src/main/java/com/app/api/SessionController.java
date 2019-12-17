package com.app.api;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.api.captch.CaptchaService;
import com.app.model.response.OperationResponse.ResponseStatusEnum;
import com.app.model.session.SessionItem;
import com.app.model.session.SessionResponse;
import com.app.model.user.Login;
import com.app.model.user.User;
import com.app.repo.UserRepo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/*
This is a dummy rest controller, for the purpose of documentation (/session) path is map to a filter
 - This will only be invoked if security is disabled
 - If Security is enabled then SessionFilter.java is invoked
 - Enabling and Disabling Security is done at config/applicaton.properties 'security.ignored=/**'
*/

@RestController
@Api(tags = { "Authentication" })
public class SessionController {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	CaptchaService captchaService;

	@ApiResponses(value = { @ApiResponse(code = 200, message = "Will return a security token, which must be passed in every request", response = SessionResponse.class) })
	@RequestMapping(value = "/session", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public SessionResponse newSession(@RequestBody Login login, HttpServletRequest request, HttpServletResponse response) {
		SessionResponse resp = new SessionResponse();
//		String captchaErrorMessage = captchaService.validateCaptcha(login.getCaptchaInput(), login.getCaptchaKey(), CaptchaService.getCaptchaStrMap());
//
//		if (StringUtils.isNotEmpty(captchaErrorMessage)) {
//			resp.setOperationStatus(ResponseStatusEnum.ERROR);
//			resp.setOperationMessage(captchaErrorMessage);
//		}
		
		User user = userRepo.findOneByUserIdAndPassword(login.getUsername(), login.getPassword()).orElse(null);
		SessionItem sessionItem = new SessionItem();
		if (user != null) {
			sessionItem.setToken("xxx.xxx.xxx");
			sessionItem.setUserId(user.getUserId());
			sessionItem.setFirstName(user.getFirstName());
			sessionItem.setLastName(user.getLastName());
			sessionItem.setEmail(user.getEmail());
			sessionItem.setRoles(Arrays.asList(user.getRole().toString()));

			resp.setOperationStatus(ResponseStatusEnum.SUCCESS);
			resp.setOperationMessage("Dummy Login Success");
			resp.setItem(sessionItem);
		} else {
			resp.setOperationStatus(ResponseStatusEnum.ERROR);
			resp.setOperationMessage("Login Failed");
		}
		return resp;
	}

}
