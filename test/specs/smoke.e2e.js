import HomePage from "../pages/HomePage.js";
import RegistrationPage from "../pages/RegistrationPage.js";
import LoginPage from "../pages/LoginPage.js";
import ProfileSettingsPage from "../pages/ProfileSettingsPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import PostCreationPage from "../pages/PostCreationPage.js";
import FullPostPage from "../pages/FullPostPage.js";
import RandomUser from "../resources/RandomUser.js";
import RandomPost from "../resources/RandomPost.js";
import SampleData from "../resources/SampleData.js";

// npx wdio run wdio.conf.js

describe('Smoke Test', () => {
  const randomUser = new RandomUser();
  const randomPost = new RandomPost();
  const invalidUser = new RandomUser();
  const sampleData = new SampleData();

  let homePage, registrationPage, loginPage, profilePage, profileSettingsPage, postCreationPage, fullPostPage;

  beforeEach(async () => {
    homePage = new HomePage();
    registrationPage = new RegistrationPage();
    loginPage = new LoginPage();
    profilePage = new ProfilePage();
    profileSettingsPage = new ProfileSettingsPage();
    postCreationPage = new PostCreationPage();
    fullPostPage = new FullPostPage();

    await browser.reloadSession();
    await homePage.visit();
  });
  it('Registration Test', async () => {

    await registrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    await homePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Register as existing user', async () => {

    await registrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    await registrationPage.assertEmailTakenErrorMsg();
    await registrationPage.assertUsernameTakenErrorMsg();
  });
  it('Login Test', async () => {

    await loginPage.login(randomUser.getEmail, randomUser.getPassword);
    await homePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Login using invalid email', async () => {

    await loginPage.login(invalidUser.getEmail, randomUser.getPassword);
    await loginPage.assertUsernameOrPasswordErrorMsg();
  });
  it('Login using invalid password', async () => {

    await loginPage.login(randomUser.getEmail, invalidUser.getPassword);
    await loginPage.assertUsernameOrPasswordErrorMsg();
  });
  it('Logout Test', async () => {

    await loginPage.login(randomUser.getEmail, randomUser.getPassword);
    await homePage.clickSettingsBtn();
    await profileSettingsPage.clickLogoutBtn();
    await homePage.assertSignInBtnVisible();
  });
  it('Liking a Post on the Main Page', async () => {
    const likeUser = new RandomUser();

    await registrationPage.registerUser(likeUser.getUsername, likeUser.getEmail, likeUser.getPassword);
    await homePage.clickGlobalFeedTab();
    await homePage.likeByTitleAndVerify(sampleData.getTitle);
  });
  it('Removing a favorited article on the profile page', async () => {

    await loginPage.login(randomUser.getEmail, randomUser.password);
    await homePage.clickGlobalFeedTab();
    await homePage.likeByTitleAndVerify(sampleData.getTitle2);
    await homePage.clickProfileBtn();
    await profilePage.clickFavoritedArticlesTab();
    await profilePage.removeLikeFromPostByTitleAndVerify(sampleData.getTitle2);
    await profilePage.refreshUntilNoPostsByAuthorAreDisplayed(sampleData.getAuthor);

  });
  it('Liking a post without logging in', async () => {
    await homePage.likePostByTitle(sampleData.getTitle);
    await registrationPage.assertUserIsOnRegistrationPage();
  });
  it('Creating a Post', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await registrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await homePage.clickNewPostBtn();
    await postCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await fullPostPage.verifyPostContents(randomPost.getTitle, randomPost.getContent);
  });
  it('Editing a post', async () => {
    const postUser = new RandomUser();
    const updatedPost = new RandomPost();

    await registrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await homePage.clickNewPostBtn();
    await postCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await fullPostPage.clickEditPostBtn();
    await postCreationPage.createPost(updatedPost.getTitle, updatedPost.getSummary, updatedPost.getContent);
    await fullPostPage.verifyPostContents(updatedPost.getTitle, updatedPost.getContent);
  });
  it('Deleting a post from the profile page', async () => {
    const randomPost = new RandomPost();

    await loginPage.login(randomUser.getEmail, randomUser.password);
    await homePage.clickNewPostBtn();
    await postCreationPage.enterPostTitle(randomPost.getTitle);
    await postCreationPage.enterPostSummary(randomPost.getSummary);
    await postCreationPage.enterPostContent(randomPost.getContent);
    await postCreationPage.clickPostSubmitBtn();
    await homePage.clickProfileBtn();
    await profilePage.clickPostByTitle(randomPost.getTitle);
    await fullPostPage.clickDeletePostBtn();
    await homePage.clickProfileBtn();
    await profilePage.refreshUntilNoPostsByAuthorAreDisplayed(randomUser.getUsername);

  });
  it('Following an author via the Profile page', async () => {
    const followUser = new RandomUser();

    await registrationPage.registerUser(followUser.getUsername, followUser.getEmail, followUser.getPassword);

    await homePage.clickGlobalFeedTab();
    await homePage.clickPostAuthor(sampleData.getAuthor);
    await profilePage.clickFollowBtn();

    await homePage.clickHomeBtn();
    await homePage.clickYourFeedTab();
    await homePage.assertPostsByAuthorDisplayed(sampleData.getAuthor);
  });
  it('Unfollowing an author via the Full Post page', async () => {

    await loginPage.login(randomUser.getEmail, randomUser.getPassword);
    await homePage.clickGlobalFeedTab();
    await homePage.clickPostAuthor(sampleData.getAuthor);
    await profilePage.clickFollowBtn();
    await homePage.clickHomeBtn();
    await homePage.clickPostByAuthor(sampleData.getAuthor);
    await fullPostPage.clickFollowBtn();
    await homePage.clickHomeBtn();
    await homePage.refreshUntilNoPostsByAuthorAreDisplayed(sampleData.getAuthor);
  });
  it('Following an author without logging in', async () => {

    await homePage.clickGlobalFeedTab();
    await homePage.clickPostAuthor(sampleData.getAuthor);
    await profilePage.clickFollowBtn();
    await loginPage.assertUserIsOnLoginPage();
  });
  it('Posting a comment on a post', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await registrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await homePage.clickNewPostBtn();
    await postCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await fullPostPage.createComment(randomPost.getComment);
    await fullPostPage.assertCommentByContent(randomPost.getComment);

  });
  it('Deleting a comment', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await registrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await homePage.clickNewPostBtn();
    await postCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await fullPostPage.createComment(randomPost.getComment);
    await fullPostPage.assertCommentByContent(randomPost.getComment);
    await fullPostPage.deleteCommentByContent(randomPost.getComment);
    await fullPostPage.assertNoCommentByContent(randomPost.getComment);

  });
  it('Posting a comment without logging in ', async () => {

    homePage.clickPostByAuthor(sampleData.getAuthor);
    fullPostPage.assertCommentInputFieldNotVisible();
    fullPostPage.assertLoginToCommentMsgVisible();
  });
  it('Posting an empty comment', async () => {

    await loginPage.login(randomUser.getEmail, randomUser.password);
    await homePage.clickPostByAuthor(sampleData.getAuthor);
    await fullPostPage.clickCommentSubmitBtn();
    await fullPostPage.assertEmptyCommentErrorMsgVisible();
  });

  it('Creating a post with an existing title', async () => {
    const randomPost = new RandomPost();
    const updatedPost = new RandomPost();

    await loginPage.login(randomUser.getEmail, randomUser.password);
    await homePage.clickNewPostBtn();
    await postCreationPage.enterPostTitle(randomPost.getTitle);
    await postCreationPage.enterPostSummary(randomPost.getSummary);
    await postCreationPage.enterPostContent(randomPost.getContent);
    await postCreationPage.clickPostSubmitBtn();
    await fullPostPage.clickEditPostBtn();
    await postCreationPage.createPost(randomPost.getTitle, updatedPost.getSummary, updatedPost.getContent);
    await postCreationPage.assertTitleExistsErrorMsgVisible();
  });
});