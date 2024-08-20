import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { TopicDTO } from "dto/topic.dto";
import { TopicService } from "./topicFilm.service";
import { AuthGuard } from "guards/auth.guards";
import LocalFilesInterceptor from "utils/localFiles.interceptor";
@Controller("api/topic")
export class TopicFilmController {
    constructor(private readonly topicService: TopicService) { }


    @Get('AllTopics/:id')
    getAllTopics(@Param('id', ParseIntPipe) id: number) {
        console.log(id)
        return this.topicService.getAllTopic(id)
    }
    @Get('getSchedules')
    getSchedules() {
        return this.topicService.getSchedules()
    }
    @Get(':slug/detail')
    getDetialTopics(@Param('slug') slug: string) {

        return this.topicService.getDetailTopic(slug)
    }
    @Get(':slug/relation')
    // @UseGuards(AuthGuard)
    getDetialTopicWithRelation(@Param('slug') slug: string) {

        return this.topicService.getDetialTopicWithRelation(slug)
    }

    @Get('hotMovie')
    getHotTopics() {
        return this.topicService.getHotTopics()
    }

    @Post('create')
    @UseGuards(AuthGuard)
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file',
        path: '/movie'
    }))
    createTopic(@UploadedFile() file: Express.Multer.File, @Body() data: TopicDTO) {
        let dest = ''
        if (file) {
            dest = file.destination + '/' + file.filename
        }
        return this.topicService.createTopic(data, dest)
    }
    @UseGuards(AuthGuard)
    @Post(':id/uploadFile')
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file',
        path: '/movie'
    }))
    createFile(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {
        console.log(file.path)
        return this.topicService.createFile(id, file)
    }
    @UseGuards(AuthGuard)
    @Post(':id/update')
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file',
        path: '/movie'
    }))
    updateTopic(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Req() req: Request, @Body() topic: TopicDTO) {
        console.log(topic, file); // See what's being passed in
        let dest = ''
        if (file) {
            dest = file.destination + '/' + file.filename
        }
        return this.topicService.updateTopic(id, topic, dest)
    }
    @UseGuards(AuthGuard)
    @Delete(':id/delete')
    deleteTopic(@Param('id') id: string) {
        console.log(id)
        return this.topicService.deleteTopic(id)
    }
}