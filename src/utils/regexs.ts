// Regex simples de CNPJ: 00.000.000/0000-00
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

// Regex simples de CPF : 000.000.000-00
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

// Regex de telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
export const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
export const phoneForeignRegex =
  /^(\+55\s?\(\d{2}\)\s?\d{4,5}-\d{4}|\+\d{2}\s?\d{1,13})$/;

export const cepRegex = /^\d{5}-\d{3}$/;

export const emailRegex =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
export const unicodeEmailRegex =
  /^(?!\.)(?!.*\.\.)([\p{L}\p{N}_'+\-\.]*)[\p{L}\p{N}_+-]@([\p{L}\p{N}][\p{L}\p{N}\-]*\.)+[\p{L}]{2,}$/u;