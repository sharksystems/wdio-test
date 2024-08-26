import BasePage from './BasePage.js';
import PostFeed from '../page_elements/PostFeed.js';
import { expect as wdioExpect } from '@wdio/globals';

export default class HomePage extends BasePage {
    postFeed = new PostFeed();

    async likePostByTitle(title) {
        await this.postFeed.likePostByTitle(title);
    }
    async likeByTitleAndVerify(title) {
        await this.postFeed.likeAndVerifyCountIncrement(title);
    }
    async removeLikeByTitleAndVerify(title) {
        await this.postFeed.removeLikeAndVerifyCountDecrement(title);
    }
    async clickPostAuthor(author) {
        await this.postFeed.clickPostAuthor(author);
    }
    async clickPostByAuthor(author) {
        await this.postFeed.clickPostByAuthor(author);
    }
    async clickGlobalFeedTab() {
        await this.postFeed.clickGlobalFeedTab();
    }
    async clickYourFeedTab() {
        await this.postFeed.clickYourFeedTab();
    }
    async assertPostsByAuthorDisplayed(author) {
        await this.postFeed.assertPostIsDisplayedByAuthor(author);
    }
    async assertNoPostsDisplayed() {
        await this.postFeed.assertNoPostsDisplayed();
    }
    async refreshUntilNoPostsByAuthorAreDisplayed(author) {
        await this.postFeed.refreshFeedUntilNoPostsByAuthorAreDisplayed(author)
    }
    async assertUserIsOnHomepage() {
        await wdioExpect(browser).toHaveUrl('https://conduit.realworld.how/');
    }

    async visit() {
        await super.visit('');
    }
}