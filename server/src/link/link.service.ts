import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Link } from './link.entity';

import { CreateLinkDto } from './dto/createLink.dto';
import { UpdateLinkDto } from './dto/updateLink.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async getLinks() {
    const links = await this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.createdBy', 'createdBy') // createdBy 객체에서 id만 선택
      .leftJoinAndSelect('link.category', 'category') // category 객체에서 id만 선택
      .orderBy('link.createDate', 'DESC')
      .select([
        'link.id',
        'link.name',
        'link.url',
        'createdBy.id',
        'category.id',
      ])
      .getMany();

    return links.map((link) => ({
      id: link.id,
      createdById: link.createdBy.id,
      name: link.name,
      url: link.url,
      categoryId: link.category.id,
    }));
  }

  async getLinkById(id: number) {
    try {
      const link = await this.linkRepository
        .createQueryBuilder('link')
        .leftJoinAndSelect('link.createdBy', 'createdBy') // createdBy 객체에서 id만 선택
        .leftJoinAndSelect('link.category', 'category') // category 객체에서 id만 선택
        .select([
          'link.id',
          'link.name',
          'link.url',
          'createdBy.id',
          'category.id',
        ])
        .where({ id })
        .getOne();

      if (!link) {
        throw new NotFoundException('존재하지 않는 링크입니다.');
      }
      return {
        id: link.id,
        createdById: link.createdBy.id,
        name: link.name,
        url: link.url,
        categoryId: link.category.id,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크 조회 도중 에러가 발생했습니다.',
      );
    }
  }

  async createLink(createLinkDto: CreateLinkDto, userId: number) {
    const { name, url, categoryId } = createLinkDto;

    const newLink = this.linkRepository.create({
      name,
      url,
      createdBy: { id: userId },
      category: { id: categoryId },
    });

    try {
      const savedLink = await this.linkRepository.save(newLink); // DB에 저장

      return {
        id: savedLink.id,
        name: savedLink.name,
        url: savedLink.url,
        createdById: savedLink.createdBy.id,
        categoryId: savedLink.category.id,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 추가하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async updateLink(id: number, updateLinkDto: UpdateLinkDto, userId: number) {
    // --수정할 link 정보 가져오기
    // getLinkById로 반환된 list는 카테고리 컬럼 자체가 아니므로 수정반영이 안됨
    // getLinkById를 사용할 경우 return 부분에 categoryId: link.category처럼 카테고리 정보를 넣어줘야 함
    // const link = await this.getLinkById(id);

    // --수정할 link 정보 가져오기
    // 연관관계가 포함된 리스트 정보를 가져와서 수정해야 조인컬럼인 카테고리 정보까지 끌고올 수 있음
    const link = await this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.createdBy', 'createdBy') // createdBy 객체에서 id만 선택
      .leftJoinAndSelect('link.category', 'category') // category 객체에서 id만 선택
      .select([
        'link.id',
        'link.name',
        'link.url',
        'createdBy.id',
        'category.id',
      ])
      .where({ id })
      .getOne();

    if (!link) {
      throw new NotFoundException('존재하지 않는 링크입니다.');
    }

    // --권한 체크
    if (userId !== link.createdBy.id) {
      throw new BadRequestException('링크 수정 권한이 없습니다.');
    }

    const { name, url, categoryId } = updateLinkDto;

    // --데이터 수정
    link.name = name;
    link.url = url;
    link.category.id = categoryId;

    try {
      await this.linkRepository.save(link); // DB에 저장

      return {
        id: link.id,
        createdById: link.createdBy.id,
        name: link.name,
        url: link.url,
        categoryId: link.category.id,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 수정하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteLink(id: number, userId: number) {
    const link = await this.getLinkById(id);

    // --권한 체크
    if (userId !== link.createdById) {
      throw new BadRequestException('링크 수정 권한이 없습니다.');
    }

    try {
      await this.linkRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async searchLinks(categoryId?: number, keyword?: string) {
    const query = this.linkRepository
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.createdBy', 'createdBy')
      .leftJoinAndSelect('link.category', 'category')
      .orderBy('link.id', 'ASC') // id 기준 오름차순 정렬
      .select([
        'link.id',
        'link.name',
        'link.url',
        'link.create_date',
        'createdBy.id',
        'category.id',
        'category.name',
      ]);

    // --카테고리id와 일치하는 링크 조회
    if (categoryId !== undefined) {
      query.andWhere('category.id = :categoryId', { categoryId });
    }

    // --키워드 검색(부분 일치)
    if (keyword && keyword.trim() !== ' ') {
      query.andWhere('link.name LIKE :keyword', { keyword: `%${keyword}%` });
    }

    const links = await query.getMany();

    return links.map((link) => ({
      id: link.id,
      createdById: link.createdBy.id,
      name: link.name,
      url: link.url,
      categoryId: link.category.id,
    }));
  }
}
