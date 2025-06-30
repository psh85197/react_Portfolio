export interface Roles extends Record<string, unknown> {
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  id: string;
  description: string;
  orderNo: number;
  privileges: Privilege[];
}

export interface Privilege extends Record<string, unknown> {
  id: string;
  description: string;
}

export interface GetRolesResponse extends Record<string, unknown> {
  roles: Roles[]
}

export interface RemoveAdminsRequest extends Record<string, unknown> {
  checkIds: (number | string)[];
}

export interface RemoveAdminsResponse extends Record<string, unknown> {
  removed: boolean;
}
