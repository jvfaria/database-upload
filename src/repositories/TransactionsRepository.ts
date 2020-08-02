import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionsDTO {
  id: string;
  title: string;
  value: number;
  type: string;
  category: Category;
  created_at: Date;
  updated_at: Date;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomes = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        // eslint-disable-next-line no-param-reassign
        acc += Number(transaction.value);
      }
      return acc;
    }, 0);

    const outcomes = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'outcome') {
        // eslint-disable-next-line no-param-reassign
        acc += Number(transaction.value);
      }
      return acc;
    }, 0);

    const balance: Balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return balance;
  }
}

export default TransactionsRepository;
