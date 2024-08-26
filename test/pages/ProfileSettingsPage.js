import BasePage from './BasePage.js';

export default class ProfileSettingsPage extends BasePage {
    get logoutBtn() {
        return $('button.btn-outline-danger');
    }

    async clickLogoutBtn() {
        await this.logoutBtn.click();
    }
}