import AccountService from "../src/AccountService";

describe("AccountService", () => {
  let accountService: AccountService;

  beforeEach(() => {
    accountService = new AccountService();
  });

  test("Deve criar um passageiro", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-27",
      isPassenger: true,
    };

    const output = await accountService.signup(input);

    const account = await accountService.getAccount(output.accountId);
    expect(account.account_id).toBeDefined();
    expect(account.name).toBe(input.name);
    expect(account.email).toBe(input.email);
    expect(account.cpf).toBe(input.cpf);
  });

  test("Deve criar um motorista", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-27",
      isDriver: true,
      carPlate: "ABC1234",
    };

    const output = await accountService.signup(input);

    expect(output.accountId).toBeDefined();
  });

  test("Não deve criar um passageiro com cpf inválido", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-00",
      isPassenger: true,
    };

    const output = accountService.signup(input);

    await expect(output).rejects.toThrow(new Error("Invalid cpf"));
  });

  test("Não deve criar um passageiro com nome inválido", async () => {
    const input = {
      name: "John",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-27",
      isPassenger: true,
    };

    const output = accountService.signup(input);

    await expect(output).rejects.toThrow(new Error("Invalid name"));
  });

  test("Não deve criar um motorista com placa do carro inválida", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-27",
      isDriver: true,
      carPlate: "ABC123",
    };

    const output = accountService.signup(input);

    await expect(output).rejects.toThrow(new Error("Invalid plate"));
  });

  test("Não deve criar um passageiro com email inválido", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@`,
      cpf: "693.384.200-27",
      isPassenger: true,
    };

    const output = accountService.signup(input);

    await expect(output).rejects.toThrow(new Error("Invalid email"));
  });

  test("Não deve criar um passageiro com email duplicado", async () => {
    const input = {
      name: "John Doe",
      email: `johndoe${Math.random()}@mail.com`,
      cpf: "693.384.200-27",
      isPassenger: true,
    };

    await accountService.signup(input);
    const output = accountService.signup(input);

    await expect(output).rejects.toThrow(new Error("Account already exists"));
  });
});
