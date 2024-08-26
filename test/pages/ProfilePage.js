import PostFeed from '../page_elements/PostFeed.js';
import BasePage from './BasePage.js';
import { browser } from '@wdio/globals'

export default class ProfilePage extends BasePage {
    postFeed = new PostFeed();

    get editProfileBtn() {
        return $('//a[contains(.,"Edit Profile Settings")]');
    }
    get followBtn() {
        return $('i.ion-plus-round');
    }

    async clickEditProfileBtn() {
        await this.editProfileBtn.click();
    }
    async clickFavoritedArticlesTab() {
        await browser.pause(2000);
        await this.postFeed.clickFavoritedArticlesTab();
    }
    async clickMyArticlesTab() {
        await this.postFeed.clickMyArticlesTab();
    }
    async clickFollowBtn() {
        await this.followBtn.click();
        await browser.pause(2000);
    }
    async clickPostByTitle(title) {
        await this.postFeed.clickPostByTitle(title);
        await browser.pause(1000);
    }
    async refreshUntilNoPostsByAuthorAreDisplayed(author) {
        await this.postFeed.refreshProfileUntilNoPostsByAuthorAreDisplayed(author)
    }

    async assertNoPostsDisplayed() {
        await this.postFeed.assertNoPostsDisplayed();
    }
    async removeLikeFromPostByTitleAndVerify(title) {
        await this.postFeed.removeLikeAndVerifyCountDecrement(title);
    }
}