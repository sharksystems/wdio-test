import BasePage from './BasePage.js';
import PostFeed from '../page_elements/PostFeed.js';
import { expect as wdioExpect } from '@wdio/globals';

class HomePage extends BasePage {

    async likePostByTitle(title) {
        await PostFeed.likePostByTitle(title);
    }
    async likeByTitleAndVerify(title) {
        await PostFeed.likeAndVerifyCountIncrement(title);
    }
    async removeLikeByTitleAndVerify(title) {
        await PostFeed.removeLikeAndVerifyCountDecrement(title);
    }
    async clickPostAuthor(author) {
        await PostFeed.clickPostAuthor(author);
    }
    async clickPostByAuthor(author) {
        await PostFeed.clickPostByAuthor(author);
    }
    async clickGlobalFeedTab() {
        await PostFeed.clickGlobalFeedTab();
    }
    async clickYourFeedTab() {
        await PostFeed.clickYourFeedTab();
    }
    async assertPostsByAuthorDisplayed(author) {
        await PostFeed.assertPostIsDisplayedByAuthor(author);
    }
    async assertNoPostsDisplayed() {
        await PostFeed.assertNoPostsDisplayed();
    }
    async refreshUntilNoPostsByAuthorAreDisplayed(author) {
        await PostFeed.refreshFeedUntilNoPostsByAuthorAreDisplayed(author)
    }
    async assertUserIsOnHomepage() {
        await wdioExpect(browser).toHaveUrl('https://conduit.realworld.how/');
    }

    async visit() {
        await super.visit('');
    }
}

export default new HomePage();