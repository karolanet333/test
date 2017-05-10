import { PaymentMethod } from './payment-method';
import { SolFacActionHist } from './SolFacActionHist';
import { SolFacHist } from './SolFacHist';
import { Project } from './project';
import { SolFacState } from './SolFacState';
import { BillingMilestoneDetail } from './billing-milestone-detail';
export interface BillingMilestone {
    Id: number;
    Name: string;

    //encabezado del hito
    ScheduledDate: Date;
    Monto: number;
    MontoInic: number;

    //Customer section
    IdCustomer: number;
    CustomerDescription: string;
    CustomerContact: string;
    CustomerPhone: string;

    //Project section
    IdProject: number;
    ProjectName: string;
    Project: Project;
    

    //Service section
    IdService: number;

    //datos del documento
    ContractNumber: number;
    IdPaymentMethod: number;
    PaymentMethodDescription: string;
    PaymentMethod: PaymentMethod;
    Plazo: number;
    Comments: string;
    Status: string;
    ApplicantName: string;
    IdDocumentType: number;

    //detalles
    BillingMilestoneDetails: BillingMilestoneDetail[];

    //Totales
    ImporteBruto: number;
    Iva21: number;
    ImporteBrutoMasIva21: number;
    Total: number;

    //impuestos
    ImpCapital: number;
    ImpProvBsAs: number;

    ImpOtrasProv_1: number;
    IdImpProv_1: number;

    ImpOtrasProv_2: number;
    IdImpProv_2: number;

    ImpOtrasProv_3: number;
    IdImpProv_3: number;

    //estado
    CurrState: string;
    IdSolFacState: number;
    SolFacState: SolFacState;

    //historial
    SolFacHists: SolFacHist[];

    //acciones
    SolFacActionHists: SolFacActionHist[];

    Cobrado: boolean;
}