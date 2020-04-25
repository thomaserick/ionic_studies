import { EstadoDTO } from "./estado.dto";

export interface CidadeDTO {
    id: string;
    name: string;
    estado?: EstadoDTO;
}