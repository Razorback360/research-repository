export const permissionMapping = {
    "ADMIN_READ":{
        id: "ADMIN_READ",
        name: "Adminstrator Reading",
        description: "Read any and all submissions regardless of status and ownership."
    },
    "ADMIN_WRITE": {
        id: "ADMIN_WRITE",
        name: "Adminstrator Writing",
        description: "Delete & edit submissions."
    },
    "ADMIN_BAN": {
        id:"ADMIN_BAN",
        name:"Adminstrator Banning",
        description:"Ban & unban users from the platform."
    },
    "ADMIN_MODERATE": {
        id: "ADMIN_MODERATE",
        name: "Adminstrator Moderation",
        description: "Approve or reject submissions."
    },
    "ADMIN_DELETE_USER": {   
        id: "ADMIN_DELETE_USER",
        name: "Adminstrator User Deletion",
        description: "Delete users from the platform."
    },
    "ADMIN_EDIT_USER": {
        id: "ADMIN_EDIT_USER",
        name: "Adminstrator User Editing",
        description: "Edit user's permissions."
    },
    "READ": {
        id: "READ",
        name: "User Reading",
        description: "Allow the user to use search and read all approved submissions."
    },
    "WRITE": {
        id: "WRITE",
        name: "User Writing",
        description: "Allow user to submit datasets and researches."
    },
    "EDIT": {
        id: "EDIT",
        name: "User Editing",
        description: "Allow user to edit their own submissions."
    },
    "DOWNLOAD": {
        id: "DOWNLOAD",
        name: "User Downloading",
        description: "Allow user to download datasets and researches."
    }
}