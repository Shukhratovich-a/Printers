import { Controller, Get } from "@nestjs/common";

import { FilterService } from "./filter.service";

@Controller("filter")
export class FilterController {
  constructor(private readonly filterSerive: FilterService) {}

  @Get()
  async getAll() {
    return await this.filterSerive.findAll();
  }
}
