import { Body, Controller, Post } from "@nestjs/common";
import { Logindto } from "../dtos/login.dto";
import { Serviceauth } from "../services/auth.service";


@Controller('/auth')
export class Controllerrauth {

    constructor(private serviceauth: Serviceauth){}

    @Post()
    async login(@Body() loguindto: Logindto) {
        return await this.serviceauth.login(loguindto);
    }
}
