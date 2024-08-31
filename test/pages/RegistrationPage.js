import BasePage from './BasePage.js';
import { expect as wdioExpect } from '@wdio/globals';

class RegistrationPage extends BasePage {
    get usernameInputField() {
        return $('input[formcontrolname="username"]');
    }
    get emailInputField() {
        return $('input[formcontrolname="email"]');
    }
    get passwordInputField() {
        return $('input[formcontrolname="password"]');
    }
    get registerSubmitBtn() {
        return $('//button[contains(.,"Sign up")]');
    }
    get emailTakenErrorMsg() {
        return $('//li[contains(.,"email has already been taken")]');
    }
    get usernameTakenErrorMsg() {
        return $('//li[contains(.,"username has already been taken")]');
    }

    async enterUsername(username) {
        await this.usernameInputField.setValue(username);
    }
    async enterEmail(email) {
        await this.emailInputField.setValue(email);
    }
    async enterPassword(password) {
        await this.passwordInputField.setValue(password);
    }
    async clickRegisterSubmitBtn() {
        await this.registerSubmitBtn.click();
    }

    async registerUser(username, email, password) {
        await this.clickSignUpBtn();
        await this.enterUsername(username);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickRegisterSubmitBtn();
    }
    async assertEmailTakenErrorMsg() {
        await wdioExpect(this.emailTakenErrorMsg.toBeDisplayed());
    }
    async assertUsernameTakenErrorMsg() {
        await wdioExpect(this.usernameTakenErrorMsg.toBeDisplayed());
    }
    async assertUserIsOnRegistrationPage() {
        await wdioExpect(browser).toHaveUrl('https://conduit.realworld.how/register');
    }
}

export default new RegistrationPage();