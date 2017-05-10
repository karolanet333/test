import { SolFacState } from './../models/SolFacState';
import { BillingMilestone } from './../models/billing-milestone';
import { User } from './../models/user';
import { Injectable, enableProdMode} from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class UserConfigService {

  private _user: User;
  public SolFacNextState: SolFacState;
  public CanGenerateButtonText: string = "";
  public bShowGenerate: boolean;
  public bShowRefuse: boolean;
  public bCanGenerate: boolean;
  public bCanRefuse: boolean;
  public sCurrState: string = ""; //esta variable me sirve para acceder
                                  //al estado actual del hito desde el menu de usuarios
  public bPuedeEstarCobrado: boolean;

  constructor() {
    this._user = <User>{
      Id : 0,
      Name : "Usuario Anónimo"
    };
  }

  setUser(user: User){
    this._user = user;
    if (this.sCurrState != ""){
      this.Hito_CanGenerate(this.sCurrState);
    }
  }

  user(){
    return this._user;
  }

  Hito_CanGenerateNew(){
    var rpta: boolean = false;
    if (this._user != null){
      if (this._user.Profile != null){
        var sProfile = this._user.Profile.Code;
        rpta = (sProfile == "SOLFAC_GEN");
      }
    }

    return rpta;
  }

  Hito_CanEdit(){
    var rpta: boolean = false;
    if (this._user != null){
      if (this._user.Profile != null){
        rpta = true;
      }
    }

    return rpta;
  }

  Hito_CanGenerate(currState: string){
    var rpta: boolean = false;

    this.sCurrState = currState;
    this.bShowGenerate = true;
    this.bShowRefuse = true;
    this.bPuedeEstarCobrado = false;

    if (currState == "PEND"){
      rpta = this.Hito_PuedeEnviarAControlPresupuestario(currState);
      this.CanGenerateButtonText = "Enviar a Control Presupuestario"
    }
    if (currState == "REV_PRESUP"){
      rpta = this.Hito_PuedeEnviarAControlFinanzas(currState);
      this.CanGenerateButtonText = "Enviar a Control Finanzas"
    }
    if (currState == "REV_FINAN"){
      rpta = this.Hito_PuedeEnviarAFacturacion(currState);
      this.CanGenerateButtonText = "Enviar a Facturación"
    }
    if (currState == "FACT"){
      rpta = this.Hito_PuedeFinalizarCiclo(currState);
      this.CanGenerateButtonText = "Finalizar Ciclo";
      this.bPuedeEstarCobrado = true;
    }
    if (currState == "FIN"){
      rpta = false;
      this.CanGenerateButtonText = "Ciclo Finalizado";
      this.bShowGenerate = false;
      this.bShowRefuse = false;
    }

    this.bCanGenerate = rpta;

    if (currState == "PEND"){
      this.bCanRefuse = false;
    }
    else {
      this.bCanRefuse = rpta;
    }


    return rpta;
  }

  Hito_PuedeEnviarAControlPresupuestario(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "PEND" && sProfile == "SOLFAC_GEN"){
      rpta = true;
    }

    return rpta;
  }

  Hito_PuedeEnviarAControlFinanzas(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "REV_PRESUP" && sProfile == "CONTROL_PRESUP"){
      rpta = true;
    }

    return rpta;
  }

  Hito_PuedeEnviarAFacturacion(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "REV_FINAN" && sProfile == "REVISION_FINANZAS"){
      rpta = true;
    }

    return rpta;
  }

  Hito_PuedeFinalizarCiclo(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "FACT" && sProfile == "FACTURACION"){
      rpta = true;
    }

    return rpta;
  }

/*
  Hito_CanGenerate(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "PEND" && sProfile == "SOLFAC_GEN"){
      rpta = true;
    }
    if (currState == "REV_PRESUP" && sProfile == "CONTROL_PRESUP"){
      rpta = true;
    }
    if (currState == "REV_FINAN" && sProfile == "REVISION_FINANZAS"){
      rpta = true;
    }
    if (currState == "FACT" && sProfile == "FACTURACION"){
      rpta = true;
    }

    return rpta;
  }*/

  Hito_CanView(currState: string){
    var rpta: boolean = false;
    var sProfile = '';
    if (this._user.Profile != null){
      var sProfile = this._user.Profile.Code;
    }

    if (currState == "PEND" && sProfile == "SOLFAC_GEN"){
      rpta = true;
    }
    if (currState == "REV_PRESUP" && sProfile == "CONTROL_PRESUP"){
      rpta = true;
    }
    if (currState == "REV_FINAN" && sProfile == "REVISION_FINANZAS"){
      rpta = true;
    }
    if (currState == "FACT" && sProfile == "FACTURACION"){
      rpta = true;
    }

    return rpta;
  }

}
