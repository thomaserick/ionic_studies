import { CidadeDTO } from "./cidade.dto";

export interface EnderecoDTO {
    id: string;
    logradouro: string;
    numend: string;
    complemento: string;
    bairro: string;
    cep: string;
    cidade: CidadeDTO;
}