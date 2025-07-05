import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';

@Controller('documents')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class DocumentController {
    constructor(private readonly docService: DocumentService) { }

    @Post()
    @Roles('USER') //only user can create documents
    create(@Body() createData: CreateDocumentDto, @Req() req) {
        return this.docService.create(createData, req.user)

    }
    @Get()
    findAll(@Query('page') page: number, @Query('limit') limit: number, @Req() req) {
        return this.docService.findAll(page, limit, req.user)
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req) {
        return this.docService.findOne(+id, req.user)
    }

    @Put(':id')
    update(@Param('id') id: string, updateData: UpdateDocumentDto, @Req() req) {
        return this.docService.update(+id, updateData, req.user)
    }

    @Delete(':id')
    @Roles('ADMIN') //only admin can delete
    delete(@Param('id') id: string,@Req() req) {
        return this.docService.remove(+id,req.user)
    }


}
