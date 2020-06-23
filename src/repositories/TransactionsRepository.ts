import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const income = this.transactions.reduce((total, transaction) => {
      return transaction.type === 'income' ? total + transaction.value : total;
    }, 0);
    const outcome = this.transactions.reduce((total, transaction) => {
      return transaction.type === 'outcome' ? total + transaction.value : total;
    }, 0);
    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ type, title, value }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ value, title, type });
    const { total } = this.getBalance();

    if (transaction.type === 'outcome' && transaction.value > total) {
      throw Error('Total amount less than the transaction amount.');
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
