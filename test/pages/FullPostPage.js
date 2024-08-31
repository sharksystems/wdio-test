import BasePage from './BasePage.js';
import { expect as wdioExpect, browser } from '@wdio/globals';

class FullPostPage extends BasePage {
    get deletePostBtn() {
        return $('button.btn-outline-danger');
    }
    get editPostBtn() {
        return $('a.btn-outline-secondary');
    }
    get followBtn() {
        return $('button:has(i.ion-plus-round)');
    }
    get loginToCommentMsg() {
        return $('//div[@class="col-xs-12 col-md-8 offset-md-2"]//div[contains(.,"Sign in or sign up to add comments on this article.")]');
    }
    get commentInputField() {
        return $('textarea[placeholder="Write a comment..."]');
    }
    get commentSubmitBtn() {
        return $('button[type="submit"]');
    }
    get emptyCommentErrorMsg() {
        return $(`//li[contains(.,"body can't be blank")]`);
    }

    async clickDeletePostBtn() {
        await this.deletePostBtn.click();
        await browser.pause(2000);
    }
    async clickEditPostBtn() {
        await this.editPostBtn.click();
        await browser.pause(1000);
    }
    async clickFollowBtn() {
        await this.followBtn.click();
        await browser.pause(2000);
    }
    async assertPostTitle(title) {
        await wdioExpect($(`//h1[contains(.,"${title}")]`)).toBeDisplayed();
    }
    async assertPostSummary(summary) {
        await wdioExpect($(`//p[contains(.,"${summary}")]`)).toBeDisplayed();
    }
    async assertPostContent(content) {
        await wdioExpect($(`//p[contains(.,"${content}")]`)).toBeDisplayed();
    }
    async verifyPostContents(title, content) {
        await this.assertPostTitle(title);
        await this.assertPostContent(content);
    }

    async clickCommentSubmitBtn() {
        await this.commentSubmitBtn.click();
    }
    async createComment(content) {
        await this.commentInputField.setValue(content);
        await this.clickCommentSubmitBtn();
    }
    async deleteCommentByContent(content) {
        await $(`//div[@class="card"and contains(.,"${content}")]//i[@class="ion-trash-a"]`).click();;
    }
    async assertCommentByContent(content) {
        await wdioExpect($(`//div[@class="card-block"and contains(.,"${content}")]`)).toBeDisplayed();
    }
    async assertNoCommentByContent(content) {
        await wdioExpect($(`//div[@class="card-block"and contains(.,"${content}")]`)).not.toBeDisplayed();
    }
    async assertCommentInputFieldNotVisible() {
        await wdioExpect(this.commentInputField).not.toBeDisplayed();
    }
    async assertLoginToCommentMsgVisible() {
        await wdioExpect(this.loginToCommentMsg).toBeDisplayed();
    }
    async assertEmptyCommentErrorMsgVisible() {
        await wdioExpect(this.emptyCommentErrorMsg).toBeDisplayed();
    }
}

export default new FullPostPage();