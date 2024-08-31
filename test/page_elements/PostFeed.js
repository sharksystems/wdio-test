import { expect as wdioExpect, browser } from '@wdio/globals';

class PostFeed {
    get yourFeedTab() {
        return $('//a[contains(.,"Your Feed")]');
    }
    get globalFeedTab() {
        return $('//a[contains(.,"Global Feed")]');
    }
    get myArticlesTab() {
        return $('//a[contains(.,"My Posts")]');
    }
    get favoritedArticlesTab() {
        return $('//a[contains(.,"Favorited Posts")]');
    }
    get noPostsMsg() {
        return $('//div[contains(text(), "No articles are here... yet.")]');
    }
    get articlePreview() {
        return $('div.article-preview');
    }

    async clickYourFeedTab() {
        await this.yourFeedTab.waitForClickable();
        await this.yourFeedTab.click();
    }
    async clickGlobalFeedTab() {
        await this.globalFeedTab.waitForClickable();
        await this.globalFeedTab.click();
    }
    async clickMyArticlesTab() {
        await this.myArticlesTab.waitForClickable();
        await this.myArticlesTab.click();
    }
    async clickFavoritedArticlesTab() {
        await this.favoritedArticlesTab.waitForClickable();
        await this.favoritedArticlesTab.click();
    }

    async assertNoPostsDisplayed() {
        await browser.pause(500);
        await expect(this.noPostsMsg).toBeDisplayed();
    }
    async assertPostIsDisplayedByAuthor(author) {
        await browser.pause(500);
        const postByAuthor = await $(`//div[@class='article-preview']//a[contains(.,"${author}")]`);
        await postByAuthor.waitForDisplayed();
        await expect(postByAuthor).toBeDisplayed();
    }
    async clickPostAuthor(author) {
        const postAuthorLink = await $(`(//a[contains(.,"${author}")])[1]`);
        await postAuthorLink.waitForClickable();
        await postAuthorLink.click();
    }
    async clickPostByAuthor(author) {
        const postByAuthor = await $(`(//div[@class='article-preview' and contains(.,"${author}")])[1]//a[@class='preview-link']/span`);
        await postByAuthor.waitForClickable();
        await postByAuthor.click();
    }
    async clickPostByTitle(title) {
        const postByTitle = await $(`//div[@class = 'article-preview']//h1[contains(.,"${title}")]`);
        await postByTitle.waitForClickable();
        await postByTitle.click();
    }
    async likePostByTitle(title) {
        const likeButton = await $(`//div[@class = 'article-preview' and contains(.,"${title}")]//button`);
        await likeButton.waitForClickable();
        await likeButton.click();
        await browser.pause(2000);
    }
    async getLikeCountByTitle(title) {
        const likeButton = await $(`//div[@class = 'article-preview' and contains(.,"${title}")]//button`);
        const likeCountText = await likeButton.getText();
        return parseInt(likeCountText);
    }
    async likeAndVerifyCountIncrement(title) {
        const initialCount = await this.getLikeCountByTitle(title);
        await this.likePostByTitle(title);
        const newCount = await this.getLikeCountByTitle(title);
        await wdioExpect(newCount).toEqual(initialCount + 1);
    }
    async removeLikeAndVerifyCountDecrement(title) {
        const initialCount = await this.getLikeCountByTitle(title);
        await this.likePostByTitle(title);
        const newCount = await this.getLikeCountByTitle(title);
        await wdioExpect(newCount).toEqual(initialCount - 1);
    }
    async arePostsByAuthorDisplayed(author) {
        const posts = await $$(`//div[@class='article-preview']//a[contains(.,"${author}")]`);
        return posts.length > 0;
    }
    async refreshProfileUntilCanClickPostByAuthor(author, retryCount = 5) {
        let attempts = 0;
        let postsDisplayed
        while (attempts < retryCount) {
            await this.clickFavoritedArticlesTab();
            await browser.pause(500);
            await this.clickMyArticlesTab();
            await browser.pause(500);

            postsDisplayed = await this.arePostsByAuthorDisplayed(author);
            if (postsDisplayed) {
                break;
            }
            attempts++;
        }
        await this.clickPostByAuthor(author);
    }
    async refreshProfileUntilNoPostsByAuthorAreDisplayed(author, myPosts = false, retryCount = 5) {
        let attempts = 0;
        let postsDisplayed
        while (attempts < retryCount) {
            if (!myPosts) {
                await this.clickMyArticlesTab();
                await browser.pause(500);
                await this.clickFavoritedArticlesTab();
                await browser.pause(500);
            }
            else {
                await this.clickFavoritedArticlesTab();
                await browser.pause(500);
                await this.clickMyArticlesTab();
                await browser.pause(500);
            }

            postsDisplayed = await this.arePostsByAuthorDisplayed(author);
            if (!postsDisplayed) {
                break;
            }
            attempts++;
        }
        await this.assertNoPostsDisplayed();
    }
    async refreshFeedUntilNoPostsByAuthorAreDisplayed(author, retryCount = 5) {
        let attempts = 0;
        while (attempts < retryCount) {
            await this.clickGlobalFeedTab();
            await browser.pause(500);
            await this.clickYourFeedTab();
            await browser.pause(500);

            const postsDisplayed = await this.arePostsByAuthorDisplayed(author);
            if (!postsDisplayed) {
                break;
            }
            attempts++;
        }
        await this.assertNoPostsDisplayed();
    }
}

export default new PostFeed();