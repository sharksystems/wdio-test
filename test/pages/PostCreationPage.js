import BasePage from './BasePage.js';
import { expect as wdioExpect, browser } from '@wdio/globals'

export default class PostCreationPage extends BasePage {
    get postTitleInput() {
        return $('input[formcontrolname="title"]');
    }
    get postSummaryInput() {
        return $('input[formcontrolname="description"]');
    }
    get postContentInput() {
        return $('textarea[formcontrolname="body"]');
    }
    get postSubmitBtn() {
        return $('button.btn-lg');
    }
    get titleExistsErrorMsg() {
        return $('//li[contains(.,"title must be unique")]')
    }

    async enterPostTitle(title) {
        await this.postTitleInput.clearValue();
        await this.postTitleInput.setValue(title);
    }
    async enterPostSummary(summary) {
        await this.postSummaryInput.clearValue();
        await this.postSummaryInput.setValue(summary);
    }
    async enterPostContent(content) {
        await this.postContentInput.clearValue();
        await this.postContentInput.setValue(content);
    }
    async clickPostSubmitBtn() {
        await this.postSubmitBtn.click();
        await browser.pause(5000);
    }
    async createPost(title, summary, content) {
        await this.enterPostTitle(title);
        await this.enterPostSummary(summary);
        await this.enterPostContent(content);
        await this.clickPostSubmitBtn();
    }
    async assertTitleExistsErrorMsgVisible() {
        await wdioExpect(this.titleExistsErrorMsg).toBeDisplayed();
    }
}