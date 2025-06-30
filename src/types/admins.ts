export interface GetAdminResponse extends Record<string, unknown> {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  id: string;
  updatePassword: string;
  email: string;
  passwordUpdatedAt: string;
  accountDisabled: boolean;
  loginFailCnt: number
  accountLocked: boolean;
  roleIds: string[];
};

export interface Admins extends Record<string, unknown> {
  id: string;
  email: string;
  accountDisabled: boolean;
  accountLocked: boolean;
  createdAt: string;
  updatedAt: string;
  roles: Roles[];
};

export interface CreateAdminRequest extends Record<string, unknown> {
  id: string;
  password: string;
  email: string;
  roleIds: string[];
  accountDisabled: boolean;
  accountLocked: boolean;
}

export interface CreateAdminResponse extends Record<string, unknown> {
  id: string;
}

export interface Roles extends Record<string, unknown> {
  id: string;
  description: string;
  orderNo: number;
  privileges: GetPrivileges[];
}

export interface GetPrivileges extends Record<string, unknown> {
  id: string;
}

export interface GetAdminsParams extends Record<string, unknown> {
  searchField: string;
  searchValue: string;
  searchRole: string;
}

export interface GetAdminsResponse extends Record<string, unknown> {
  content: Admins[]
}

export interface RemoveAdminsRequest extends Record<string, unknown> {
  checkIds: (number | string)[];
}

export interface RemoveAdminsResponse extends Record<string, unknown> {
  removed: boolean;
}

export interface UpdateAdminRequest extends Record<string, unknown> {
  id: string;
  updatePassword: string;
  email: string;
  accountDisabled: boolean;
  accountLocked: boolean;
  roleIds: string[];
}

export interface UpdateAdminResponse extends Record<string, unknown> {
  updateId: string;
}