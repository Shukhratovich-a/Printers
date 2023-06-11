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

import { CategoryService } from "@modules/category/category.service";

import { SubCategoryService } from "./subCategory.service";

import { CreateSubCategoryDto } from "./dto/create-subCategory.dto";
import { UpdateSubCategoryDto } from "./dto/update-subCategory.dto";

import {
  GET_MANY_SUCCESS,
  GET_ONE_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  INVALID_INPUT_ERROR,
  NOT_FOUND_ERROR,
  CATEGORY_NOT_FOUND_ERROR,
} from "./subCategory.constants";

import { ResponseInterceptor } from "@interceptors/response.interceptor";

import { ResponseMessage } from "@/decorators/response-message.decorator";
import { ContextInterceptor } from "@/interceptors/context.interceptor";

@Controller("sub-category")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Sub Category")
export class SubCategoryController {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  async getAll() {
    return await this.subCategoryService.findAll();
  }

  @Get("/by-id/:id")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getById(@Param("id", ParseIntPipe) id: number) {
    return await this.subCategoryService.findById(id);
  }

  @Get("/by-alias/:alias")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getByAlias(@Param("alias") alias: string) {
    return await this.subCategoryService.findByAlias(alias);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(CREATE_SUCCESS)
  @ApiCreatedResponse({ description: CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  @ApiNotFoundResponse({ description: CATEGORY_NOT_FOUND_ERROR })
  async create(@Body(ValidationPipe) body: CreateSubCategoryDto) {
    const category = await this.categoryService.checkById(body.categoryId);
    if (!category) throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR);

    return await this.subCategoryService.create(body, category);
  }

  @Patch("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage(UPDATE_SUCCESS)
  @UseInterceptors(ContextInterceptor)
  @ApiAcceptedResponse({ description: UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  @ApiNotFoundResponse({ description: NOT_FOUND_ERROR })
  async update(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) body: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryService.checkById(id);
    if (!subCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    const category = await this.categoryService.checkById(body.categoryId);
    if (!category) throw new NotFoundException(CATEGORY_NOT_FOUND_ERROR);

    return await this.subCategoryService.update(id, body);
  }

  @Delete("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage(DELETE_SUCCESS)
  @ApiAcceptedResponse({ description: DELETE_SUCCESS })
  @ApiNotFoundResponse({ description: NOT_FOUND_ERROR })
  async delete(@Param("id", ParseIntPipe) id: number) {
    const oldSubCategory = await this.subCategoryService.checkById(id);
    if (!oldSubCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.subCategoryService.delete(id);
  }
}
