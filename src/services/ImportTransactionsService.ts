import csvparse from 'csv-parse';
import fs from 'fs';
import { In, getRepository, getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';
import Category from '../models/Category';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class ImportTransactionsService {
  public async execute(file: Express.Multer.File): Promise<Transaction[]> {
    if (file.mimetype !== 'text/csv') {
      throw new AppError('Cannot read other files. CSV only !');
    }
    const categoriesRepo = getRepository(Category);
    const transactionsRepo = getCustomRepository(TransactionsRepository);
    const readCsvStream = fs.createReadStream(file.path);

    const parseStream = csvparse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const categories: string[] = [];
    const transactions: TransactionDTO[] = [];

    const csvStream = readCsvStream.pipe(parseStream);

    csvStream.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );
      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({
        title,
        type,
        value,
        category,
      });
    });
    await new Promise(resolve => csvStream.on('end', resolve));

    const existentCategories = await categoriesRepo.find({
      where: {
        title: In(categories),
      },
    });

    const existentCategoriesTitles = existentCategories.map(
      (category: Category) => category.title,
    );

    const notExistentCategoriesTitles = categories
      .filter(category => !existentCategoriesTitles.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoriesRepo.create(
      notExistentCategoriesTitles.map(title => ({
        title,
      })),
    );

    await categoriesRepo.save(newCategories);

    const finalCategories = [...existentCategories, ...newCategories];

    const newTransactions = transactionsRepo.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category: finalCategories.find(
          category => category.title === transaction.category,
        ),
      })),
    );

    const finalTransactions = await transactionsRepo.save(newTransactions);

    await fs.promises.unlink(file.path);

    return finalTransactions;
  }
}

export default ImportTransactionsService;
