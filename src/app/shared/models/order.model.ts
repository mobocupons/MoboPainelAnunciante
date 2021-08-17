export class Order{
    mensagem:String
    objeto: ObjectOrder
}
export class ObjectOrder{
    Id:number
    CupomId:number
    UsuarioEnderecoId:number
    PedidoStatusId:number
    PagamentoId:number
    RealizadoEm:any
    UsuarioEndereco:any
    PedidoStatus:any
    Pagamento:any
    PedidoComplementos:any[]
}

