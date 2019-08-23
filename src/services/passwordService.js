

import BaseHttpService from "./baseHttpService";
import Config from "react-native-config";

export default class PasswordService extends BaseHttpService {
    constructor(props) {
        super(props);
    }

    requestTemporaryPassword = ({ document, option }) => this.get(`${Config.API_ACCOUNTS_URL}/api/default/v2/password/forgot/${option}/document/${document}`, true)

    newRequestTemporaryPassword = ({ document, option }) => this.get(`${Config.API_ACCOUNTS_URL}/api/default/v3/password/forgot/${option}/document/${document}`, true)

    requestChangePasswordSecurityCode = ({ option }) => this.get(`${Config.API_ACCOUNTS_URL}/api/default/v2/password/change/${option}`)

    changePassword = payload => this.put(`${Config.API_ACCOUNTS_URL}/api/default/v2/password/change`, payload)

    changePasswordV3 = payload => this.put(`${Config.API_ACCOUNTS_URL}/api/default/v3/password/change`, payload)

    requestTransactionId = ({ document, option, temporaryPassword }) => this.get(`${Config.API_ACCOUNTS_URL}/api/default/v3/password/change/token/${option}/${temporaryPassword}/${document}`)
}