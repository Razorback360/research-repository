export const permissionMapping = {
    "ADMIN_READ":{
        id: "ADMIN_READ",
        name: "Administrator Reading",
        nameAr: "صلاحية قراءة المشرف",
        description: "Read any and all submissions regardless of status and ownership.",
        descriptionAr: "قراءة أي من التقديمات بغض النظر عن الحالة والملكية."
    },
    "ADMIN_WRITE": {
        id: "ADMIN_WRITE",
        name: "Adminstrator Writing",
        nameAr: "صلاحية كتابة المشرف",
        description: "Delete & edit submissions.",
        descriptionAr: "حذف وتعديل التقديمات."
    },    "ADMIN_BAN": {
        id:"ADMIN_BAN",
        name:"Adminstrator Banning",
        nameAr: "صلاحية حظر المشرف",
        description:"Ban & unban users from the platform.",
        descriptionAr: "حظر المستخدمين وإلغاء الحظر عنهم."
    },
    "ADMIN_MODERATE": {
        id: "ADMIN_MODERATE",
        name: "Adminstrator Moderation",
        nameAr: "صلاحية إشراف المشرف",
        description: "Approve or reject submissions.",
        descriptionAr: "الموافقة على التقديمات أو رفضها."
    },    "ADMIN_DELETE_USER": {   
        id: "ADMIN_DELETE_USER",
        name: "Adminstrator User Deletion",
        nameAr: "صلاحية حذف المستخدمين",
        description: "Delete users from the platform.",
        descriptionAr: "حذف المستخدمين من المنصة."
    },
    "ADMIN_EDIT_USER": {
        id: "ADMIN_EDIT_USER",
        name: "Adminstrator User Editing",
        nameAr: "صلاحية تعديل المستخدمين",
        description: "Edit user's permissions.",
        descriptionAr: "تعديل صلاحيات المستخدمين."
    },    "READ": {
        id: "READ",
        name: "User Reading",
        nameAr: "صلاحية قراءة المستخدم",
        description: "Allow the user to use search and read all approved submissions.",
        descriptionAr: "السماح للمستخدم باستخدام البحث وقراءة جميع التقديمات المعتمدة."
    },
    "WRITE": {
        id: "WRITE",
        name: "User Writing",
        nameAr: "صلاحية كتابة المستخدم",
        description: "Allow user to submit datasets and researches.",
        descriptionAr: "السماح للمستخدم بتقديم مجموعات البيانات والأبحاث."
    },    "EDIT": {
        id: "EDIT",
        name: "User Editing",
        nameAr: "صلاحية تعديل المستخدم",
        description: "Allow user to edit their own submissions.",
        descriptionAr: "السماح للمستخدم بتعديل تقديماتهم الخاصة."
    },
    "DOWNLOAD": {
        id: "DOWNLOAD",
        name: "User Downloading",
        nameAr: "صلاحية تنزيل المستخدم",
        description: "Allow user to download datasets and researches.",
        descriptionAr: "السماح للمستخدم بتنزيل مجموعات البيانات والأبحاث."
    }
}