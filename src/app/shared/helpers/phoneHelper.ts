import { Inject, Injectable } from "@angular/core";

@Injectable()
export class  PhoneHelper{
    constructor(){}
convertPhoneToMask(phone:String){
    if(phone!=null){
        let firstStep = phone.split("55")
        let secondStep = firstStep[1].replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3')
        return secondStep;
    }
    else{
        return '';
    }
    
}
}