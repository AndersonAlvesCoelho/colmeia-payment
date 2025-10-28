// Máscara de CPF: 000.000.000-00
export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
    .slice(0, 14);
}

// Máscara de CNPJ: 00.000.000/0000-00
export function maskCNPJ(value: string): string {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}

// Máscara de telefone: (00) 00000-0000 ou (00) 0000-0000
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 14);
  }

  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15);
}

export function maskPhoneForeign(value: string, isForeign: boolean): string {
  // Remove tudo que não é número
  let digits = value.replace(/\D/g, '');

  if (isForeign) {
    // Estrangeiro → permite + e até 15 dígitos
    let val = value.startsWith('+') ? value : '+' + value;

    val = '+' + val.slice(1).replace(/\D/g, '');
    const digits = val.slice(1, 16);

    if (digits.length > 2) {
      const countryCode = digits.slice(0, 2);
      const rest = digits.slice(2);
      return `+${countryCode} ${rest}`;
    }

    return val;
  } else {
    // Nacional → força +55, mas permite apagar DDD
    if (digits.startsWith('55')) digits = digits.slice(2);
    digits = digits.slice(0, 11);

    const ddd = digits.slice(0, 2);
    const part1 = digits.slice(2, 7);
    const part2 = digits.slice(7, 11);

    let formatted = '+55';
    if (ddd) formatted += ` (${ddd}`;
    if (ddd && part1) formatted += `) ${part1}`;
    if (part2) formatted += `-${part2}`;

    return formatted;
  }
}

// Máscara de email (validação básica)
export function maskEmail(value: string): string {
  // Para email, apenas retornamos o valor limpo (sem espaços)
  return value.toLowerCase().trim();
}

export function maskCpfCnpj(value: string): string {
  const numeric = value.replace(/\D/g, '');

  if (numeric.length <= 11) {
    // CPF: 000.000.000-00
    return numeric
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
      .slice(0, 14);
  } else {
    // CNPJ: 00.000.000/0000-00
    return numeric
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
      .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
      .slice(0, 18);
  }
}

export function maskCep(value: string): string {
  return value
    .replace(/\D/g, '') // Remove tudo que não for dígito
    .replace(/^(\d{5})(\d)/, '$1-$2') // Adiciona o hífen após os 5 primeiros dígitos
    .slice(0, 9); // Limita a 9 caracteres (incluindo o hífen)
}
