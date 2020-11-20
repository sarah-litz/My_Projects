import Preferences from '../models/Preferences';
import { ContextType } from '../type';
declare class PreferencesCreateInput {
    trackCaffeine?: boolean;
    trackAnxiety?: boolean;
    trackDreams?: boolean;
    trackMelatonin?: boolean;
}
export declare class PreferencesResolver {
    preferences(context: ContextType): Promise<Preferences[]>;
    createPreferences(options: PreferencesCreateInput, context: ContextType): Promise<Preferences>;
}
export {};
