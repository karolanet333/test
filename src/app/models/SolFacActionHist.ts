import { User } from './user';
import { SolFacActionState } from './SolFacActionState';
import { BillingMilestone } from './billing-milestone';
export interface SolFacActionHist{
    Id: number;
    IdMilestone: number;
    IdSolFacActionState: Number;
    IdUser: number;
    MontoAnte: number;
    MontoNuevo: number;
    IdMilestoneSource: number;
    Fecha: Date;
    BillingMilestone: BillingMilestone;
    BillingMilestoneSource: BillingMilestone;
    SolFacActionState: SolFacActionState;
    User: User;
}