const API_BASE_URL = window.location.host === 'localhost' ? 'http://148.72.212.41:8080/api/v1' : 'https://admin-api.coastok.com/api/v1';

const USER_ROLE = [
    "Non Coastok",
    "Coastok Member",
    "Frontliner",
    "Facilitator",
    "Area Leader",
    "Assistant Director",
    "General Secretary",
    "Director",
];

const MARITAL_STATUS = {
    1: "SINGLE",
    2: "MARRIED",
    3: "DIVORCED",
    4: "WIDOWED",
};

const GENDER = {
    1: "MALE",
    2: "FEMALE",
    3: "OTHER"
};

const FEST_TYPE = {
    1: "UDGAAR",
    2: "VIPLAVA",
    3: "TEMPLE_CONNECT",
    4: "COLLEGE_COACHING",
    5: "VALUE_EDUCATION",
    6: "CAMP",
    7: "COASTOK_VIDEOS"
};

const FILE_TYPE = {
    1: "AUDIO",
    2: "VIDEO",
    3: "IMAGE",
};

const ADMIN_ROLE = [
    "No_Access",
    "Read",
    "Write"
];

const QUESTION_CATEGORY = {
    1: "PERSONAL",
    2: "PREACHING",
    3: "OTHER"
};

const STATUS = [
    "Default",
    "Active",
    "Inactive",
    "Deleted",
];

function safeLoadMedia(mediaUrl) {
    if (window.location.host === 'localhost') {
        // localhost
        return mediaUrl
    }
    return mediaUrl.replace('http://148.72.212.41:8080', 'https://admin-api.coastok.com');
}