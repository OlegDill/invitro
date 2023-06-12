function getChatLinks(arr, type) {
    return arr?.find(a => a.type === type)?.uri;
}

function getChatSettingsUrl(territory) {
    return `${window.location.origin}/site/api/settings/frontend/web-chat/${territory}`;
}

function getMultiButtonOptions() {
    const options = window.sessionStorage.getItem('__threadsMultiButtonOptions');
    return JSON.parse(options);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getClientData(obj) {
    if (obj) {
        const data = JSON.parse(obj);
        return {
            name: data.nickname,
            phone: data.phone,
            email: data.email,
            personalManager: data.personalManager ?? '',
            customField: data.customField ?? ''
        };
    }
}

function getToken() {
    return window.localStorage.getItem('lk3.token');
}

function getChatSettingsUrlAuthorization(territory) {
    return `${window.location.origin}/site/api/settings/frontend/web-chat/${territory}/authorized`;
}

const TERRITORIES_BY_DOMAIN = {
    ru: 'RUSSIA',
    su: 'CRIMEA',
    by: 'BELARUS',
    kz: 'KAZAKHSTAN',
    ua: 'RUSSIA',
    am: 'ARMENIA',
    kg: 'KYRGYZSTAN'
};

const INVITRO_LKP_COUNTRY_CODE = 'INVITRO_LKP_COUNTRY_CODE';
const INVITRO_USER_ID = 'INVITRO_USER_ID';
const LK_USER = 'lk_user';
