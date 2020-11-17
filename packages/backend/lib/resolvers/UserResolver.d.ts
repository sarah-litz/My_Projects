import { ContextType } from '../type';
declare class SafeUser {
    email: string;
}
export declare class UserResolver {
    addUser(email: string, password: string, context: ContextType): Promise<string>;
    loginUser(email: string, password: string, context: ContextType): Promise<string>;
    me(context: ContextType): Promise<SafeUser>;
}
export {};
