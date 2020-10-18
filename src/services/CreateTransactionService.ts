import { response } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateDTO): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction invalid');
    }

    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw new Error('Insufficient balance');
    }
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
