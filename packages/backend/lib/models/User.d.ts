import Preferences from './Preferences';
import SleepDatum from './SleepDatum';
export declare class User {
    id: number;
    email: string;
    password: string;
    count: number;
    preferences: Preferences[];
    sleepData: SleepDatum[];
}
