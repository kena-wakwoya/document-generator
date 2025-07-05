import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './document.model';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserRole } from 'src/user/user.model';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
    constructor(
        @InjectModel(Document)
        private docModel: typeof Document,
    ) { }

    async create(createDto: CreateDocumentDto, ownerID: number) {
    return this.docModel.create({ ...createDto, ownerID } as any);
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

    async findOne(id: number, user: any) {
    const doc = await this.docModel.findByPk(id);
    if (!doc) throw new NotFoundException('Document not found');
    if (user.role !== 'ADMIN' && doc.ownerID !== user.userId) {
      throw new ForbiddenException('Unauthorized Access');
    }

    return doc;
  }

  async update(id:number,updateData:UpdateDocumentDto,user:any){
    const doc = await this.findOne(+id,user)
    return doc.update(updateData)
  }

  async remove(id:number){
    const doc = await this.docModel.findByPk(id)
    if(!doc){
        throw new NotFoundException('Document not found')

    }
    await doc.destroy();
  }

}
