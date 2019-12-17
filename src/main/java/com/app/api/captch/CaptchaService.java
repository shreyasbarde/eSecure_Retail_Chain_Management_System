package com.app.api.captch;

import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.app.model.captcha.CaptchaDetails;

import lombok.Synchronized;
import net.jodah.expiringmap.ExpirationPolicy;
import net.jodah.expiringmap.ExpiringMap;

/** @author in579prason */
@Service
public class CaptchaService {

	private static ExpiringMap<String, String> captchaStrMap = ExpiringMap.builder().variableExpiration().build();

	/** This Method Loads/Reloads Captcha.
	 * 
	 * @return CaptchaDetails captchaImage,captchaStr,captchaKey */
	public CaptchaDetails loadCaptcha() {
		CaptchaDetails captchaDtls = new CaptchaDetails();
		captchaDtls.setCaptchaStr(CaptchaUtil.generateRandomString());
		captchaDtls.setCaptchaImage(CaptchaUtil.generateCaptchaImage(captchaDtls.getCaptchaStr()));
		captchaDtls.setCaptchaKey(CaptchaUtil.generateRandomString());
		putCaptchaStrMap(captchaDtls);
		return captchaDtls;
	}

	/** Validates Captcha from server side.
	 * 
	 * @param captchaInput-Entered
	 *            by user.
	 * @param captchaKey-To
	 *            verify captcha.
	 * @param captchaStrMap-To
	 *            compare captcha Key available or not.
	 * @return -Captcha Expired! if captchaKey is not available in captchaStrMap.
	 * @return -Please enter a valid captcha if captchaInput is not match in captchaStrMap.
	 * @return -Blank String if captcha match */
	public String validateCaptcha(String captchaInput, String captchaKey, Map<String, String> captchaStrMap) {
		String captchaErrorMessage = "";
		if (!captchaStrMap.containsKey(captchaKey)) {
			captchaErrorMessage = "Captcha Expired!";
		} else if (!captchaStrMap.get(captchaKey).equalsIgnoreCase(captchaInput)) {
			captchaErrorMessage = "Please enter a valid captcha";
		}
		if (StringUtils.isNotBlank(captchaKey)) {
			captchaStrMap.remove(captchaKey);
		}
		return captchaErrorMessage;

	}


	/** @param captchaDtls
	 */
	@Synchronized
	private static void putCaptchaStrMap(CaptchaDetails captchaDtls) {
		captchaStrMap.put(captchaDtls.getCaptchaKey(), captchaDtls.getCaptchaStr(), ExpirationPolicy.CREATED, 3, TimeUnit.MINUTES);
	}

	/** @return */
	public static Map<String, String> getCaptchaStrMap() {
		return captchaStrMap;
	}

}
