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


describe('Smoke Test', () => {
  const randomUser = new RandomUser();
  const randomPost = new RandomPost();
  const invalidUser = new RandomUser();
  const sampleData = new SampleData();

  beforeEach(async () => {
    await browser.reloadSession();
    await HomePage.visit();
  });
  
  it('Registration Test', async () => {

    await RegistrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    await HomePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Register as existing user', async () => {

    await RegistrationPage.registerUser(randomUser.getUsername, randomUser.getEmail, randomUser.getPassword);
    await RegistrationPage.assertEmailTakenErrorMsg();
    await RegistrationPage.assertUsernameTakenErrorMsg();
  });
  it('Login Test', async () => {

    await LoginPage.login(randomUser.getEmail, randomUser.getPassword);
    await HomePage.assertLoggedInAs(randomUser.getUsername);
  });
  it('Login using invalid email', async () => {

    await LoginPage.login(invalidUser.getEmail, randomUser.getPassword);
    await LoginPage.assertUsernameOrPasswordErrorMsg();
  });
  it('Login using invalid password', async () => {

    await LoginPage.login(randomUser.getEmail, invalidUser.getPassword);
    await LoginPage.assertUsernameOrPasswordErrorMsg();
  });
  it('Logout Test', async () => {

    await LoginPage.login(randomUser.getEmail, randomUser.getPassword);
    await HomePage.clickSettingsBtn();
    await ProfileSettingsPage.clickLogoutBtn();
    await HomePage.assertSignInBtnVisible();
  });
  it('Liking a Post on the Main Page', async () => {
    const likeUser = new RandomUser();

    await RegistrationPage.registerUser(likeUser.getUsername, likeUser.getEmail, likeUser.getPassword);
    await HomePage.clickGlobalFeedTab();
    await HomePage.likeByTitleAndVerify(sampleData.getTitle);
  });
  it('Removing a favorited article on the profile page', async () => {

    await LoginPage.login(randomUser.getEmail, randomUser.password);
    await HomePage.clickGlobalFeedTab();
    await HomePage.likeByTitleAndVerify(sampleData.getTitle2);
    await HomePage.clickProfileBtn();
    await ProfilePage.clickFavoritedArticlesTab();
    await ProfilePage.removeLikeFromPostByTitleAndVerify(sampleData.getTitle2);
    await ProfilePage.refreshUntilNoPostsByAuthorAreDisplayed(sampleData.getAuthor);

  });
  it('Liking a post without logging in', async () => {
    await HomePage.likePostByTitle(sampleData.getTitle);
    await RegistrationPage.assertUserIsOnRegistrationPage();
  });
  it('Creating a Post', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await RegistrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await FullPostPage.verifyPostContents(randomPost.getTitle, randomPost.getContent);
  });
  it('Editing a post', async () => {
    const postUser = new RandomUser();
    const updatedPost = new RandomPost();

    await RegistrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await FullPostPage.clickEditPostBtn();
    await PostCreationPage.createPost(updatedPost.getTitle, updatedPost.getSummary, updatedPost.getContent);
    await FullPostPage.verifyPostContents(updatedPost.getTitle, updatedPost.getContent);
  });
  it('Deleting a post from the profile page', async () => {
    const randomPost = new RandomPost();

    await LoginPage.login(randomUser.getEmail, randomUser.password);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await HomePage.clickProfileBtn();
    await ProfilePage.refreshProfileUntilCanClickPostByAuthor(randomUser.getUsername);
    await FullPostPage.clickDeletePostBtn();
    await HomePage.clickProfileBtn();
    await ProfilePage.refreshUntilNoPostsByAuthorAreDisplayed(randomUser.getUsername, true);

  });
  it('Following an author via the Profile page', async () => {
    const followUser = new RandomUser();

    await RegistrationPage.registerUser(followUser.getUsername, followUser.getEmail, followUser.getPassword);

    await HomePage.clickGlobalFeedTab();
    await HomePage.clickPostAuthor(sampleData.getAuthor);
    await ProfilePage.clickFollowBtn();

    await HomePage.clickHomeBtn();
    await HomePage.clickYourFeedTab();
    await HomePage.assertPostsByAuthorDisplayed(sampleData.getAuthor);
  });
  it('Unfollowing an author via the Full Post page', async () => {

    await LoginPage.login(randomUser.getEmail, randomUser.getPassword);
    await HomePage.clickGlobalFeedTab();
    await HomePage.clickPostAuthor(sampleData.getAuthor);
    await ProfilePage.clickFollowBtn();
    await HomePage.clickHomeBtn();
    await HomePage.clickPostByAuthor(sampleData.getAuthor);
    await FullPostPage.clickFollowBtn();
    await HomePage.clickHomeBtn();
    await HomePage.refreshUntilNoPostsByAuthorAreDisplayed(sampleData.getAuthor);
  });
  it('Following an author without logging in', async () => {

    await HomePage.clickGlobalFeedTab();
    await HomePage.clickPostAuthor(sampleData.getAuthor);
    await ProfilePage.clickFollowBtn();
    await LoginPage.assertUserIsOnLoginPage();
  });
  it('Posting a comment on a post', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await RegistrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await FullPostPage.createComment(randomPost.getComment);
    await FullPostPage.assertCommentByContent(randomPost.getComment);

  });
  it('Deleting a comment', async () => {
    const postUser = new RandomUser();
    const randomPost = new RandomPost();

    await RegistrationPage.registerUser(postUser.getUsername, postUser.getEmail, postUser.getPassword);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, randomPost.getSummary, randomPost.getContent);
    await FullPostPage.createComment(randomPost.getComment);
    await FullPostPage.assertCommentByContent(randomPost.getComment);
    await FullPostPage.deleteCommentByContent(randomPost.getComment);
    await FullPostPage.assertNoCommentByContent(randomPost.getComment);

  });
  it('Posting a comment without logging in ', async () => {

    HomePage.clickPostByAuthor(sampleData.getAuthor);
    FullPostPage.assertCommentInputFieldNotVisible();
    FullPostPage.assertLoginToCommentMsgVisible();
  });
  it('Posting an empty comment', async () => {

    await LoginPage.login(randomUser.getEmail, randomUser.password);
    await HomePage.clickPostByAuthor(sampleData.getAuthor);
    await FullPostPage.clickCommentSubmitBtn();
    await FullPostPage.assertEmptyCommentErrorMsgVisible();
  });

  it('Creating a post with an existing title', async () => {
    const randomPost = new RandomPost();
    const updatedPost = new RandomPost();

    await LoginPage.login(randomUser.getEmail, randomUser.password);
    await HomePage.clickNewPostBtn();
    await PostCreationPage.enterPostTitle(randomPost.getTitle);
    await PostCreationPage.enterPostSummary(randomPost.getSummary);
    await PostCreationPage.enterPostContent(randomPost.getContent);
    await PostCreationPage.clickPostSubmitBtn();
    await FullPostPage.clickEditPostBtn();
    await PostCreationPage.createPost(randomPost.getTitle, updatedPost.getSummary, updatedPost.getContent);
    await PostCreationPage.assertTitleExistsErrorMsgVisible();
  });
});
