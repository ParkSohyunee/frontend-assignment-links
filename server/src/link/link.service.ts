import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Link } from './link.entity';
import { CreateLinkDto } from './dto/createLinkDto.dto';

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

  async createLink(createLinkDto: CreateLinkDto) {
    const { name, url, category } = createLinkDto;

    const link = this.linkRepository.create({
      name,
      url,
      category,
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
}
