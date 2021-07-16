import { Campaign } from "./campaign.model"
import { Local } from "./local.model"

export class Coupom{
    id: number 
    campanhaId: number 
    usuarioId: number 
    canalId: number 
    codigo:  number  
    status: number 
    referencia:  any 
    baixadoEm:  Date  
    consumidoEm:  Date
    consumoValor: number 
    listaOrigem: number 
    especial: boolean 
    usadoDentro: boolean 
    usadoFora : boolean 
    usadoEm :  any 
    expiraEm :  any 
    localId : number 
    campanha : Campaign
    canal :  any 
    usuario :  any 
    avaliacao :  any 
    local : Local
    pedidos :  any[]
}