import { User } from './User';
export default class SleepDatum {
    id: number;
    totalHours?: number;
    didDream?: boolean;
    anxiety?: number;
    caffeine?: number;
    melatonin?: number;
    sleepQuality?: number;
    date: Date;
    user: User;
}
