import Preferences from '../models/Preferences';
import { ContextType } from '../type';
declare class PreferencesCreateInput {
    trackCaffeine?: boolean;
    trackAnxiety?: boolean;
    trackDreams?: boolean;
    trackMelatonin?: boolean;
}
export declare class SleepDataResolver {
    sleepData(context: ContextType): Promise<Preferences[]>;
    createSleepData(options: PreferencesCreateInput, context: ContextType): Promise<Preferences>;
}
export {};
