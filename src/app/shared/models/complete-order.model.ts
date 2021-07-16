import { Coupom } from "./coupom.model"
import { PaymentMethod } from "./paymentmethod.model"
import { UserAdress } from "./user-adress.model"

export class CompleteOrder
{
    value: ValueCompleteOrder[]
}
export class ValueCompleteOrder{
        id: number
        cupomId: number
        usuarioEnderecoId: number
        pedidoStatusId: number
        pagamentoId: number
        realizadoEm: Date
        observacao: any
        exibirFoneUsuario: boolean
        cupom: Coupom
        usuarioEndereco: UserAdress
        pedidoStatus: any
        pagamento: PaymentMethod
        pedidoComplementos: any[]
    }
