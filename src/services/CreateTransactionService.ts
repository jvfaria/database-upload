import { getRepository, getCustomRepository } from 'typeorm';
// import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface TransactionRequest {
  title: string;

  type: 'income' | 'outcome';

  value: number;

  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: TransactionRequest): Promise<Transaction> {
    const transactionsRepo = getCustomRepository(TransactionsRepository);
    const categoryRepo = getRepository(Category);

    const checkTransactionType = type === 'outcome';

    if (checkTransactionType) {
      const { total } = await transactionsRepo.getBalance();
      const checkFunds = total - value;
      if (checkFunds < 0) {
        throw new AppError('Insufficient funds !');
      }
    }
    let findCategory = await categoryRepo.findOne({
      where: {
        title: category,
      },
    });

    if (!findCategory) {
      findCategory = categoryRepo.create({
        title: category,
      });

      await categoryRepo.save(findCategory);
    }

    const createdTransaction = transactionsRepo.create({
      title,
      type,
      value,
      category: findCategory,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedTransaction = await transactionsRepo.save(createdTransaction);
    return savedTransaction;
  }
}

export default CreateTransactionService;
