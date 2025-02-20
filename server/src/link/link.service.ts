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
    return await this.linkRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async getLinkById(id: number) {
    try {
      const link = await this.linkRepository.findOneBy({ id });

      if (!link) {
        throw new NotFoundException('존재하지 않는 링크입니다.');
      }
      return link;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크 조회 도중 에러가 발생했습니다.',
      );
    }
  }

  async createLink(createLinkDto: CreateLinkDto) {
    const { name, url, categoryId } = createLinkDto;

    const link = this.linkRepository.create({
      name,
      url,
      categoryId,
    });

    try {
      await this.linkRepository.save(link); // DB에 저장
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        '링크를 추가하는 도중 에러가 발생했습니다.',
      );
    }
    return link;
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
