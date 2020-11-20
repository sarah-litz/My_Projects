import { User } from './User';
export default class Preferences {
    id: number;
    trackCaffeine?: boolean;
    trackAnxiety?: boolean;
    trackDreams?: boolean;
    trackMelatonin?: boolean;
    user: User;
}
