import { CpfValidator } from "../src/CpfValidator";

describe("CpfValidator", () => {
  let cpfValidator: CpfValidator;

  beforeAll(() => {
    cpfValidator = new CpfValidator();
  });

  test("Deve validar um cpf", () => {
    expect(cpfValidator.validate("48591236033")).toBeTruthy();
  });

  test("Deve validar um cpf com formatação", () => {
    expect(cpfValidator.validate("485.912.360-33")).toBeTruthy();
  });

  test("Não deve validar um cpf com digito zerado", () => {
    expect(cpfValidator.validate("485.912.360-00")).toBeFalsy();
  });

  test("Não deve validar um cpf faltando digitos", () => {
    expect(cpfValidator.validate("485.912.360")).toBeFalsy();
  });
});
