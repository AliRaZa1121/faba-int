import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';


@Injectable()
export class DatabaseService  {
  private models: { [key: string]: Model<any> };


  constructor(
    @InjectModel(Order.name) public readonly orderModel: Model<OrderDocument>,
  ) {
    this.models = {
      [Order.name]: this.orderModel,
    };
  }

  async create(modelName: string, createData: any): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.create(createData);
  }

  async createMany(modelName: string, createData: any[]): Promise<any[]> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.insertMany(createData);
  }

  async find(modelName: string, query: any): Promise<any[]> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.find(query);
  }

  async findOne(
    modelName: string,
    query: any,
    populateFields?: { field: string; select?: string }[],
  ): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    let queryBuilder = model.findOne(query);
    if (populateFields) {
      populateFields.forEach((field) => {
        queryBuilder = queryBuilder.populate(field.field, field.select);
      });
    }

    return queryBuilder.exec();
  }

  async findById(
    modelName: string,
    id: ObjectId | string,
    selectField: string = '',
    populateFields: { field: string; select?: string }[] = [],
  ): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    let query = model.findById(id);

    if (selectField) {
      query = query.select(selectField);
    }

    for (const field of populateFields) {
      query = query.populate(field.field, field.select);
    }

    return query.exec();
  }

  async updateById(
    modelName: string,
    id: ObjectId,
    updateData: any,
  ): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async updateOne(
    modelName: string,
    query: any,
    updateData: any,
  ): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.findOneAndUpdate(query, updateData, { new: true });
  }

  async updateMany(
    modelName: string,
    query: any,
    updateData: any,
  ): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.updateMany(query, updateData);
  }

  async deleteMany(modelName: string, query: any): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.deleteMany(query);
  }

  async delete(modelName: string, id: string): Promise<any> {
    const model = this.models[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return model.findByIdAndDelete(id);
  }
}
