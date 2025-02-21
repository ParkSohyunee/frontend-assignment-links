import {
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
      .orderBy('link.id', 'ASC')
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

  async updateLink(id: number, updateLinkDto: UpdateLinkDto) {
    // --수정할 link 정보 가져오기
    const link = await this.getLinkById(id);
    const { name, url, categoryId } = updateLinkDto;

    // --데이터 수정
    link.name = name;
    link.url = url;
    link.categoryId = categoryId;

    try {
      await this.linkRepository.save(link); // DB에 저장

      return link;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 수정하는 도중 에러가 발생했습니다.',
      );
    }
  }

  async deleteLink(id: number) {
    try {
      await this.linkRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 삭제하는 도중 에러가 발생했습니다.',
      );
    }
  }
}
