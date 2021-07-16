import { Anunciante } from "./anunciante.model"

export class Local{
    id : number 
    anuncianteId : number 
    nome :  String
    endereco :  String
    cidade :  String
    uf :  String 
    coordLat : number 
    coordLong : number
    telefone :  String 
    usuario :  String
    razaoSocial :  String
    sedeNumero : String    
    sedeComplemento : String
    sedeCep : String
    registroNumero : String
    inscMunicipal :    String
    inscEstadual :  String  
    email :  String
    optanteSimples : boolean 
    anunciante :  Anunciante 
    campanhaLocals :  any[] 
    cartaos :  any[] 
    fidelidadeLocals :  any[] 
    conexaoHubs :  any[]
}