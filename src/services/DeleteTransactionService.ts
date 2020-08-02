import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepo = getCustomRepository(TransactionsRepository);
    const transactionId = await transactionsRepo.findOne(id);
    if (!transactionId) {
      throw new AppError('Invalid ID', 404);
    }

    await transactionsRepo.remove(transactionId);
  }
}

export default DeleteTransactionService;
