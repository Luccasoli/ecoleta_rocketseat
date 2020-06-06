export interface Cidade {
    id: number;
    nome: string;
    microrregiao: Microrregiao;
}

export interface Microrregiao {
    id: number;
    nome: string;
    mesorregiao: Mesorregiao;
}

export interface Mesorregiao {
    id: number;
    nome: string;
    UF: Uf;
}

export interface Uf {
    id: number;
    sigla: string;
    nome: string;
    regiao: Regiao;
}

export interface Regiao {
    id: number;
    sigla: string;
    nome: string;
}
