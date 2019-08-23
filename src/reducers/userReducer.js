import {
    USER_SAVE_LOGIN_DATA_ACTION,
    USER_SAVE_COMPLEMENTATION_DATA_ACTION,
    USER_SAVE_PASSWORD_ACTION,
    USER_SAVE_TOKEN_ACTION,
    USER_DELETE_ACTION,
    USER_SAVE_TEMP_PASS_DATA_ACTION,
    USER_SAVE_IS_PAYMENTS,
    USER_SAVE_REGISTER_DATA_ACTION
} from '../actions/actionTypes';

const INITIAL_STATE = {
    cpf: '',
    firstName: '',
    fullName: '',
    email: '',
    cellphone: '',
    address: {},
    password: '',
    bearerToken: '',
    birthdayRequest: 0,
    isTemporaryPassword: false,
    hasPassword: true,
    isPayments: false,
    hasChangedEmail: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_SAVE_LOGIN_DATA_ACTION:
            return {
                ...state,
                cpf: action.payload.cpf,
                firstName: action.payload.firstName,
                birthdayRequest: action.payload.birthdayRequest,
                isTemporaryPassword: !!action.payload.isTemporaryPassword,
                hasPassword: !!action.payload.hasPassword
            };
        case USER_SAVE_COMPLEMENTATION_DATA_ACTION:
            return {
                ...state,
                fullName: action.payload.fullName,
                email: action.payload.email,
                cellphone: action.payload.cellphone,
                address: action.payload.address,
                isPayments: action.payload.isPayments,
                hasChangedEmail: action.payload.hasChangedEmail
            };
        case USER_SAVE_REGISTER_DATA_ACTION:
            return {
                ...state,
                fullName: action.payload.fullName,
                birthdayRequest: action.payload.birthdayRequest,
                transactionId: action.payload.transactionId
            };
        case USER_SAVE_PASSWORD_ACTION: return { ...state, password: action.payload };
        case USER_SAVE_TEMP_PASS_DATA_ACTION: return { ...state, isTemporaryPassword: action.payload };
        case USER_SAVE_TOKEN_ACTION: return { ...state, bearerToken: action.payload };
        case USER_SAVE_IS_PAYMENTS: return { ...state, isPayments: action.payload };
        case USER_DELETE_ACTION: return INITIAL_STATE;
        default:
            return { ...state };
    }
};