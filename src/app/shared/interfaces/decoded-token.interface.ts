import { Role } from '../enums/role.enum';

export interface DecodedToken {
    isRestricted: boolean;
    id: string;
    role: Role;
    iat: number;
    exp: number;
}
