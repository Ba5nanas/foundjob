export var BackofficeRole;
(function (BackofficeRole) {
    BackofficeRole["SUPERADMIN"] = "SUPERADMIN";
    BackofficeRole["ADMIN"] = "ADMIN";
    BackofficeRole["SUPPORT"] = "SUPPORT";
    BackofficeRole["CONTENT_MANAGER"] = "CONTENT_MANAGER";
    BackofficeRole["FINANCE"] = "FINANCE";
    BackofficeRole["VIEWER"] = "VIEWER";
})(BackofficeRole || (BackofficeRole = {}));
export const backofficeRoleLevels = {
    [BackofficeRole.SUPERADMIN]: 100,
    [BackofficeRole.ADMIN]: 80,
    [BackofficeRole.SUPPORT]: 40,
    [BackofficeRole.CONTENT_MANAGER]: 40,
    [BackofficeRole.FINANCE]: 40,
    [BackofficeRole.VIEWER]: 10
};
