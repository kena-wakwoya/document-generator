import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './document.model';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from 'src/user/user.model';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Sequelize, Transaction } from 'sequelize';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document)
        private docModel: typeof Document,
        private readonly sequelize: Sequelize
    ) { }

    async create(createDto: CreateDocumentDto, ownerID: number) {
        const transaction = await this.sequelize.transaction();
        try {
            const doc = await this.docModel.create({ ...createDto, ownerID }, { transaction });
            await transaction.commit();
            return doc;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async findAll(page: number, limit: number, user: any): Promise<{ payload: Document[], total: number }> {
        if (user.role === UserRole.ADMIN) {
            const { count, rows } = await this.docModel.findAndCountAll<Document>({
                limit: limit,
                offset: (page - 1) * limit,
                include: [{
                    model: User,
                    attributes: { exclude: ['password'] }
                }]

            })
            return { payload: rows, total: count }

        }
        const { count, rows } = await this.docModel.findAndCountAll<Document>({
            where: { ownerID: user.userId },
            limit: limit,
            offset: (page - 1) * limit,
            include: [{
                model: User,
                attributes: { exclude: ['password'] }
            }]
        })
        return { payload: rows, total: count }

    }

    async findOne(id: number, user: any, transaction?: Transaction) {
        const doc = await this.docModel.findByPk(id,{transaction});
        if (!doc) throw new NotFoundException('Document not found');
        if (user.role !== 'ADMIN' && doc.ownerID !== user.userId) {
            throw new ForbiddenException('Unauthorized Access');
        }

        return doc;
    }

    async update(id: number, updateData: UpdateDocumentDto, user: any) {
        const transaction = await this.sequelize.transaction();
        try {
            const doc = await this.findOne(+id, user, transaction)
            const updatedDoc = await doc.update(updateData, { transaction });
            await transaction.commit();
            return updatedDoc
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async remove(id: number, user: any): Promise<void> {
        const transaction = await this.sequelize.transaction();

        try {
            const doc = await this.findOne(id, user, transaction);
            await doc.destroy({ transaction });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }


}
