import { User } from './User';
export default class Preferences {
    id: number;
    trackCaffeine?: boolean;
    trackBedtime?: boolean;
    trackDreams?: boolean;
    trackMelatonin?: boolean;
    user: User;
}
