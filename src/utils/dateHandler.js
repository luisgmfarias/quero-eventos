import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  return format(date, `EEEE, dd/MM/yyyy`, { locale: ptBR });
};
