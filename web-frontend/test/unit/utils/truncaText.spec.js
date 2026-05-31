import { truncateText } from '../../../modules/core/utils/string.js'
import { describe, test, expect, toBe } from 'vitest'

describe("Truncate Text Caixa Preta", () => {
    test("Tamanho do texto igual ao limite, retorna texto inteiro", () =>{
        expect(truncateText('abcd', 4)).toBe('abcd');
    });
    test("Tamanho do texto menor que o limite, retorna texto inteiro", ()=>{
        expect(truncateText('abcd', 5)).toBe('abcd');
    });
    test("Tamanho do texto maior que o limite, retorna texto truncado", ()=>{
        expect(truncateText('abcd', 3)).toBe('abc...')
    })

    test("Limite negativo, retorna: \"\"", ()=>{
        expect(truncateText('abcd', -1)).toBe('');
    })
    test("Limite zero, retorna: \"\"", ()=>{
        expect(truncateText('abcd', 0)).toBe('');
    })
    test("Entrada invalida, retorna: \"\"", ()=>{
        expect(truncateText(123, 5)).toBe('');
    });
});


describe("Truncate Text Caixa Branca", () =>{
    test("Caminho A, Entrada vazia ou invalida, retorna: \"\"", ()=>{
        expect(truncateText(null, 5)).toBe("");
        expect(truncateText(123, 5)).toBe("");
    });
    test("Caminho B, Limite negativo ou 0, retorna: \"\"", ()=>{
        expect(truncateText("abcd", -1)).toBe("");
        expect(truncateText("abcd", 0)).toBe("");
    });
    test("Caminho C, Etrada igual ou menor que o limite, retorna texto", ()=>{
        expect(truncateText("abcd", 4)).toBe("abcd");
        expect(truncateText("abcd", 5)).toBe("abcd");
    });
    test("Caminho D, Etrada maior que o limite, retorna texto truncado", ()=>{
        expect(truncateText("abcd", 3)).toBe("abc...");
    });
});