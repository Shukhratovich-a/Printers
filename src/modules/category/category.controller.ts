import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  ValidationPipe,
  Delete,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";

import { CategoryService } from "./category.service";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

import {
  GET_MANY_SUCCESS,
  GET_ONE_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  INVALID_INPUT_ERROR,
  NOT_FOUND_ERROR,
} from "./category.constants";

import { ResponseInterceptor } from "@interceptors/response.interceptor";
import { ContextInterceptor } from "@interceptors/context.interceptor";

import { ResponseMessage } from "@decorators/response-message.decorator";

@Controller("category")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  async getAll() {
    return await this.categoryService.findAll();
  }

  @Get("/by-id/:id")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getById(@Param("id", ParseIntPipe) id: number) {
    return await this.categoryService.findById(id);
  }

  @Get("/by-alias/:alias")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getByAlias(@Param("alias") alias: string) {
    return await this.categoryService.findByAlias(alias);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(CREATE_SUCCESS)
  @ApiCreatedResponse({ description: CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  async create(@Body(ValidationPipe) body: CreateCategoryDto) {
    return await this.categoryService.create(body);
  }

  @Patch("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage(UPDATE_SUCCESS)
  @UseInterceptors(ContextInterceptor)
  @ApiAcceptedResponse({ description: UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  @ApiNotFoundResponse({ description: NOT_FOUND_ERROR })
  async update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) body: UpdateCategoryDto) {
    const oldCategory = await this.categoryService.checkById(id);
    if (!oldCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.categoryService.update(id, body);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage(DELETE_SUCCESS)
  @ApiAcceptedResponse({ description: DELETE_SUCCESS })
  @ApiNotFoundResponse({ description: NOT_FOUND_ERROR })
  async delete(@Param("id", ParseIntPipe) id: number) {
    const oldCategory = await this.categoryService.checkById(id);
    if (!oldCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.categoryService.delete(id);
  }
}
