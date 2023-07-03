import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const instanceBankAcc = getBankAccount(500);
    expect(instanceBankAcc.getBalance()).toBe(500);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 500;
    try {
      const instanceBankAcc = getBankAccount(balance);
      instanceBankAcc.withdraw(501);
    } catch (err) {
      expect((err as Error).message).toBe(
        `Insufficient funds: cannot withdraw more than ${balance}`,
      );
    }
  });

  test('should throw error when transferring more than balance', () => {
    const maxBalance = 500;
    try {
      const instanceBankAcc1 = getBankAccount(maxBalance);
      const instanceBankAcc2 = getBankAccount(100);

      instanceBankAcc1.transfer(maxBalance + 1, instanceBankAcc2);
    } catch (err) {
      expect((err as Error).message).toBe(
        `Insufficient funds: cannot withdraw more than ${maxBalance}`,
      );
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      const instanceBankAcc = getBankAccount(500);
      instanceBankAcc.transfer(100, instanceBankAcc);
    } catch (err) {
      expect((err as Error).message).toBe('Transfer failed');
    }
  });

  test('should deposit money', () => {
    const defaultBalance = 500;
    const deposit = 100;
    const instanceBankAcc = getBankAccount(defaultBalance);
    instanceBankAcc.deposit(deposit);
    expect(instanceBankAcc.getBalance()).toBe(defaultBalance + deposit);
  });

  test('should withdraw money', () => {
    const defaultBalance = 500;
    const withdraw = 100;
    const instanceBankAcc = getBankAccount(defaultBalance);
    instanceBankAcc.withdraw(withdraw);
    expect(instanceBankAcc.getBalance()).toBe(defaultBalance - withdraw);
  });

  test('should transfer money', () => {
    const instanceBankAcc1 = getBankAccount(500);
    const instanceBankAcc2 = getBankAccount(100);
    instanceBankAcc1.transfer(200, instanceBankAcc2);
    expect(instanceBankAcc2).toHaveProperty('_balance', 300);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const instanceBankAcc1 = getBankAccount(500);
    expect(instanceBankAcc1.fetchBalance()).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 500;
    const newBalance = 100;
    const instanceBankAcc = getBankAccount(balance);
    try {
      jest
        .spyOn(instanceBankAcc, 'fetchBalance')
        .mockResolvedValueOnce(newBalance);
      await instanceBankAcc.synchronizeBalance();
      expect(instanceBankAcc.getBalance()).toEqual(newBalance);
    } catch (error) {
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 500;
    const instanceBankAcc = getBankAccount(balance);
    try {
      await instanceBankAcc.synchronizeBalance();
    } catch (error) {
      expect((error as Error).message).toBe('Synchronization failed');
    }
  });
});
