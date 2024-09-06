import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { EpisodenDTO } from "dto/episoden.dto";
import { EpisodenService } from "./detailFlim.service";
import { AuthGuard } from "guards/auth.guards";
import LocalFilesInterceptor from "utils/localFiles.interceptor";
import { Request, Response } from "express";

@Controller('api/episoden')
export class DetailFilmController {
    constructor(private readonly episodenService: EpisodenService) { }

    @Get(':slug/:episoden')
    getAllEpisoden(@Param("slug") id: string, @Param("episoden") slug: string) {
        // console.log(id, slug)
        return this.episodenService.getAllEpisodenByTopic(id, slug)
    }

    @Post(':id/create')
    @UseGuards(AuthGuard)
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: "file",
        path: `/episoden`
    }))
    createEpisoden(@Param("id") id: string, @Body() episoden: EpisodenDTO, @UploadedFile() file: Express.Multer.File) {
        let dest = ''
        console.log(file)
        if (file) {
            dest = file.destination + '/' + file.filename
        }
        return this.episodenService.createEpisoden(id, episoden, dest)
    }

    @Post(':id/update')
    @UseGuards(AuthGuard)
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: "file",
        path: `/episoden`
    }))
    updateEpisoden(@Param("id") id: string, @Body() data: EpisodenDTO, @UploadedFile() file: Express.Multer.File) {
        let dest = ''
        console.log(file)
        if (file) {
            dest = file.destination + '/' + file.filename
        }
        return this.episodenService.updateEpisoden(id, data, dest)
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard)
    deleteEpisoden(@Param("id") id: string) {
        return this.episodenService.deleteEpisoden(id)
    }

    @Get('stream/:date/:slug')
    async streamVideo(@Param('date') date: string, @Param('slug') slug: string, @Req() req: Request, @Res() res: Response) {
        console.log(slug)
        return this.episodenService.streamVideo(date, slug, req, res)
    }

}
