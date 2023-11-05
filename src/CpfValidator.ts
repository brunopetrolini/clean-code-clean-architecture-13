export class CpfValidator {
  public validate(cpf: string): boolean {
    if (!cpf) return false;
    cpf = this.clean(cpf);
    if (this.isInvalidLength(cpf)) return false;
    if (this.allDigitsAreEqual(cpf)) return false;
    const dg1 = this.calculateDigit(cpf, 10);
    const dg2 = this.calculateDigit(cpf, 11);
    let checkDigit = this.extractDigits(cpf);
    const calculatedDigit = `${dg1}${dg2}`;
    return checkDigit == calculatedDigit;
  }

  private clean(cpf: string): string {
    return cpf.replace(/\D/g, "");
  }

  private isInvalidLength(cpf: string): boolean {
    return cpf.length !== 11;
  }

  private allDigitsAreEqual(cpf: string): boolean {
    return cpf.split("").every((c) => c === cpf[0]);
  }

  private calculateDigit(cpf: string, factor: number): number {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractDigits(cpf: string): string {
    return cpf.substring(cpf.length - 2, cpf.length);
  }
}
