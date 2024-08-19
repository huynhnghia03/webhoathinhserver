import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { EpisodenDTO } from "dto/episoden.dto";
import { EpisodenService } from "./detailFlim.service";
import { AuthGuard } from "guards/auth.guards";

@Controller('api/episoden')
export class DetailFilmController {
    constructor(private readonly episodenService: EpisodenService) { }

    @Get(':slug/:episoden')
    getAllEpisoden(@Param("slug") id: string, @Param("episoden") slug: string) {
        // console.log(id, slug)
        return this.episodenService.getAllEpisodenByTopic(id, slug)
    }

    @Post(':id/create')
    createEpisoden(@Param("id") id: string, @Body() episoden: EpisodenDTO) {
        return this.episodenService.createEpisoden(id, episoden)
    }

    @Post(':id/update')
    updateEpisoden(@Param("id") id: string, @Body() data: EpisodenDTO) {
        return this.episodenService.updateEpisoden(id, data)
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard)
    deleteEpisoden(@Param("id") id: string) {
        return this.episodenService.deleteEpisoden(id)
    }
}