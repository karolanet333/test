import { SolFacState } from './SolFacState';
import { User } from './user';
export interface SolFacHist{
    Id: number;
    IdBillingMilestone: number;
    SolFacState: SolFacState;
    Date: Date;
    User: User;
    Canceled: boolean;
}