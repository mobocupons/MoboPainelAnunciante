import * as dateFns from "date-fns"; import { ptBR } from "date-fns/locale";

export module DateHelper {

  export function formatDate(date: string, format: string = "dd/MM/yyyy") {
    if (date) {
      return dateFns.format(new Date(date), format, { locale: ptBR });
    }
  }

}

