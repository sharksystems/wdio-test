import PostFeed from '../page_elements/PostFeed.js';
import BasePage from './BasePage.js';
import { browser } from '@wdio/globals';

class ProfilePage extends BasePage {

    get editProfileBtn() {
        return $('//a[contains(.,"Edit Profile Settings")]');
    }
    get followBtn() {
        return $('button:has(i.ion-plus-round)');
    }

    async clickEditProfileBtn() {
        await this.editProfileBtn.click();
    }
    async clickFavoritedArticlesTab() {
        await browser.pause(2000);
        await PostFeed.clickFavoritedArticlesTab();
    }
    async clickMyArticlesTab() {
        await PostFeed.clickMyArticlesTab();
    }
    async clickFollowBtn() {
        await this.followBtn.click();
        await browser.pause(2000);
    }
    async clickPostByTitle(title) {
        await PostFeed.clickPostByTitle(title);
        await browser.pause(1000);
    }

    async removeLikeFromPostByTitleAndVerify(title) {
        await PostFeed.removeLikeAndVerifyCountDecrement(title);
    }
    async assertNoPostsDisplayed() {
        await PostFeed.assertNoPostsDisplayed();
    }
    async refreshUntilNoPostsByAuthorAreDisplayed(author, myPosts) {
        await PostFeed.refreshProfileUntilNoPostsByAuthorAreDisplayed(author, myPosts)
    }
    async refreshProfileUntilCanClickPostByAuthor(author) {
        await PostFeed.refreshProfileUntilCanClickPostByAuthor(author);
    }
}

export default new ProfilePage();