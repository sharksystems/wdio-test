import { expect as wdioExpect } from '@wdio/globals';

export default class BasePage {
    get signInBtn() {
        return $('//a[contains(.,"Sign in")]');
    }
    get signUpBtn() {
        return $('//a[contains(.,"Sign up")]');
    }
    get homeBtn() {
        return $('//a[contains(.,"Home")]');
    }
    get profileBtn() {
        return $('a:has(img.user-pic)');
    }
    get newPostBtn() {
        return $('a:has(i.ion-compose)');
    }
    get settingsBtn() {
        return $('a:has(i.ion-gear-a)');
    }

    async clickSignInBtn() {
        await this.signInBtn.click();
    }
    async clickSignUpBtn() {
        await this.signUpBtn.click();
    }
    async clickHomeBtn() {
        await this.homeBtn.click();
    }
    async clickProfileBtn() {
        await this.profileBtn.click();
    }
    async clickNewPostBtn() {
        await this.newPostBtn.click();
    }
    async clickSettingsBtn() {
        await this.settingsBtn.click();
    }

    async assertLoggedInAs(username) {
        await wdioExpect($(`//a[@href='/profile/${username}']`)).toBeDisplayed();
    }
    async assertSignInBtnVisible() {
        await wdioExpect(this.signUpBtn).toBeDisplayed();
    }

    async visit(page) {
        await browser.url(`https://conduit.realworld.how/${page}`);
    }
}