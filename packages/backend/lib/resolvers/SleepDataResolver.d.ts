import SleepDatum from '../models/SleepDatum';
import { ContextType } from '../type';
declare class SleepDatumCreateInput {
    totalHours?: number;
    didDream?: boolean;
    anxiety?: number;
    sleepQuality?: number;
    melatonin?: number;
    caffeine?: number;
    date: Date;
}
export declare class SleepDataResolver {
    sleepData(context: ContextType): Promise<SleepDatum[]>;
    createSleepData(options: SleepDatumCreateInput, context: ContextType): Promise<SleepDatum>;
    date(sleepDatum: SleepDatum): string;
}
export {};
