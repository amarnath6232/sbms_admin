export interface AssertType {
    assetTypeId?: String;
    assetType?: String;
    description?: String;
    assetCategoryName?: String;
}

export interface AssetCategory {
    assetCategoryId?: string;
    categoryName?: string;
    description?: string;
}

export interface Assert {
    assetId?: string;
    serialNumber?: string;
    storageTemperature?: string;
    ratedBetteryCapacity?: string;
    specifiedCharge?: string;
    dimensions?: string;
    dischargeRate?: string;
    nominalVoltage?: string;
    chargingPolicy?: string;
    operatingTemperature?: string;
    warrantyPeriod?: string;
    assetCategory?: string;
    assetType?: string;
    typeOfAsset?: string;
}

export interface RoleList {
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    roleId?: string;
    name?: string;
    id?: string;
    aliasName?: string;
    description?: string;
    permissionsId?: string[];
}

export interface permissionsList {
    createdBy?: string,
    createdDate: Date;
    modifiedBy?: string;
    modifiedDate?: string;
    permissionId?: string;
    name?: string;
    description?: string;
    permissionAccess?: string;
    id?: string
}
export interface Permission_read_write {
    READ: permissionsList[];
    WRITE: permissionsList[];
}

export interface CreatePermission {
    permissionId?: string;
    name?: string;
    description?: string;
}


export interface User {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    userName: string;
    emailId: string;
    password: string;
    ConfirmPassword?: string;
    phoneNumber: string;
    city: string;
    state: string;
    country: string;
    role?: string;
    permissionsId?: string[];
}


export interface Country {
    country_id: number
    id: number;
    name: string;
    phone_code: string;
}

export interface State {
    id: string;
    state_id: number;
    name: string;
}

export interface City {
    name: string;
}

export interface RoleName {
    roleId: string;
    aliasName: string;
    name: string;
    id?: string;
}

export interface Sites {
    createdBy?: string;
    createdDate?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    id: number;
    siteName: string;
    city: string;
    state: string;
    country: string;
    siteAlias?: string;
}

export interface SiteRequriment {
    id: string;
    power: string;
    voltage: string;
}

export interface SiteArchitecture {
    id: string;
    noOfModules: string;
    noOfPacks: string;
}