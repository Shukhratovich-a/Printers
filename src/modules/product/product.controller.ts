import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";

import { ProductService } from "./product.service";
import { SubCategoryService } from "../subCategory/subCategory.service";

import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

import {
  GET_MANY_SUCCESS,
  GET_ONE_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  INVALID_INPUT_ERROR,
  NOT_FOUND_ERROR,
} from "./product.constants";
import { ResponseMessage } from "@decorators/response-message.decorator";
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ContextInterceptor } from "@/interceptors/context.interceptor";
import { ResponseInterceptor } from "@/interceptors/response.interceptor";

@Controller("product")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Products")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly subCategoryService: SubCategoryService,
  ) {}

  @Get()
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  async getAll() {
    return await this.productService.findAll();
  }

  @Get("/by-id/:id")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getById(@Param("id") id: number) {
    return await this.productService.findById(id);
  }

  @Post("/by-name")
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  async getByName(@Body("name") name: string) {
    return await this.productService.findByName(name);
  }

  @Post("/by-key")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getByKey(@Body("key") key: string) {
    return await this.productService.findByKey(key);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ResponseMessage(CREATE_SUCCESS)
  @ApiCreatedResponse({ description: CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  async create(@Body(ValidationPipe) body: CreateProductDto) {
    const subCategory = await this.subCategoryService.findById(body.subCategoryId);
    if (!subCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.productService.create(body, subCategory);
  }

  @Patch("/:id")
  @HttpCode(HttpStatus.ACCEPTED)
  @ResponseMessage(UPDATE_SUCCESS)
  @UseInterceptors(ContextInterceptor)
  @ApiAcceptedResponse({ description: UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT_ERROR })
  @ApiNotFoundResponse({ description: NOT_FOUND_ERROR })
  async update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    const product = await this.productService.checkById(id);
    if (!product) throw new NotFoundException(NOT_FOUND_ERROR);

    const subCategory = await this.subCategoryService.checkById(body.subCategoryId);
    if (!subCategory) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.productService.update(id, body);
  }

  @Delete("/:id")
  @ResponseMessage(DELETE_SUCCESS)
  async delete(@Param("id", ParseIntPipe) id: number) {
    const oldProduct = await this.productService.checkById(id);
    if (!oldProduct) throw new NotFoundException(NOT_FOUND_ERROR);

    return await this.productService.delete(id);
  }
}
