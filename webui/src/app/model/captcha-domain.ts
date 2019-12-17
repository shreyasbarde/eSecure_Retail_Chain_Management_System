export class CaptchaDomain {
    captchaStr: string;
    captchaImage: string;
    captchaKey:string;
    constructor(capStr: string, capImg: string,capKey :string) {  
        this.captchaStr = capStr;
        this.captchaImage = capImg;
        this.captchaKey=capKey;
    }
}