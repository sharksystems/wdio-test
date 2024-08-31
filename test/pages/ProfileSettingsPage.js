import BasePage from './BasePage.js';

class ProfileSettingsPage extends BasePage {
    get logoutBtn() {
        return $('button.btn-outline-danger');
    }

    async clickLogoutBtn() {
        await this.logoutBtn.click();
    }
}

export default new ProfileSettingsPage();