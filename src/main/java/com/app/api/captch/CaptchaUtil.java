package com.app.api.captch;

import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Random;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/** @author in579prason */
public class CaptchaUtil {

	private CaptchaUtil() {
		// Empty Constructor 
	}

	private static final Logger LOGGER = LoggerFactory.getLogger(CaptchaUtil.class);

	/** Generates Random captcha String
	 * 
	 * @return random string */
	public static String generateRandomString() {
		Random random = new Random();
		int length = 5 + (Math.abs(random.nextInt() + 1) % 3);
		StringBuilder captchaStringBuffer = new StringBuilder();
		for (int i = 0; i < length; i++) {
			int baseCharNumber = Math.abs(random.nextInt() + 1) % 62;
			int charNumber = 0;
			if (baseCharNumber < 26) {
				charNumber = 65 + baseCharNumber;
			} else if (baseCharNumber < 52) {
				charNumber = 97 + (baseCharNumber - 26);
			} else {
				charNumber = 48 + (baseCharNumber - 52);
			}
			captchaStringBuffer.append((char) charNumber);
		}
		return StringUtils.replaceEach(captchaStringBuffer.toString(), new String[] { "I", "O", "l" }, new String[] { "1", "q", "1" });
	}

	/** Generates captcha image
	 * 
	 * @param text-captcha
	 *            String
	 * @return image */
	public static String generateCaptchaImage(String text) {
		String strCaptchImg = "";
		BufferedImage img = new BufferedImage(1, 7, BufferedImage.OPAQUE);
		Graphics2D g2d = img.createGraphics();
		Font font = new Font("MV Boli", Font.ROMAN_BASELINE, 29);
		g2d.setFont(font);
		FontMetrics fm = g2d.getFontMetrics();
		int width = fm.stringWidth(text) + 5;
		int height = fm.getHeight() + 10;
		g2d.dispose();

		img = new BufferedImage(width, height, BufferedImage.TYPE_BYTE_GRAY);
		Graphics2D g2d1 = img.createGraphics();
		g2d1.setFont(font);
		fm = g2d1.getFontMetrics();
		g2d1.drawString(text, 1, fm.getAscent());
		g2d1.dispose();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			ImageIO.write(img, "jpg", baos);
			baos.flush();

			byte[] imageInByteArray = baos.toByteArray();
			baos.close();
			strCaptchImg = javax.xml.bind.DatatypeConverter.printBase64Binary(imageInByteArray);
		} catch (IOException e) {
			LOGGER.error("Error", e);
		}
		return "data:image/jpg;base64," + strCaptchImg;
	}

}
