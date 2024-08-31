import BasePage from './BasePage.js';
import { expect as wdioExpect } from '@wdio/globals';


class LoginPage extends BasePage {
    get emailField() {
        return $('input[formcontrolname="email"]');
    }
    get passwordField() {
        return $('input[formcontrolname="password"]');
    }
    get signInButton() {
        return $('//button[contains(.,"Sign in")]');
    }
    get errorMessage() {
        return $('//li[contains (.,"email or password is invalid")]');
    }

    async enterEmail(email) {
        await this.emailField.setValue(email);
    }
    async enterPassword(password) {
        await this.passwordField.setValue(password);
    }
    async clickSignIn() {
        await this.signInButton.click();
    }
    async assertUsernameOrPasswordErrorMsg() {
        await wdioExpect(this.errorMessage).toBeDisplayed();
    }
    async login(email, password) {
        await this.clickSignInBtn();
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickSignIn();
    }
    async assertUserIsOnLoginPage() {
        await wdioExpect(browser).toHaveUrl('https://conduit.realworld.how/login');
    }
}

export default new LoginPage();
