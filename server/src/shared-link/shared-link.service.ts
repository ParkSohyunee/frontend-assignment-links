import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SharedLink } from './shared-link.entity';
import { User } from 'src/auth/user.entity';
import { Link } from 'src/link/link.entity';

import { SharedLinkDto } from './dto/shared-link.dto';

@Injectable()
export class SharedLinkService {
  constructor(
    @InjectRepository(SharedLink)
    private sharedLinkRepository: Repository<SharedLink>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async shareLink(sharedLinkDto: SharedLinkDto, userId: number) {
    const { linkId, username } = sharedLinkDto;

    // --사용자 존재 확인
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`사용자 "${username}"를 찾을 수 없습니다.`);
    }

    // --링크 존재 및 생성자 확인
    const link = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: ['createdBy'],
    });

    if (!link) {
      throw new NotFoundException(`존재하지 않는 링크입니다.`);
    }

    // --현재 로그인한 사용자가 링크 생성자인지 확인
    if (link.createdBy.id !== userId) {
      throw new BadRequestException('자신이 생성한 링크만 공유할 수 있습니다.');
    }

    // --중복된 공유 여부 확인
    const existingShare = await this.sharedLinkRepository.findOne({
      where: { userId: user.id, linkId },
    });

    if (existingShare) {
      throw new ConflictException(
        `이미 이 링크를 해당 사용자와 공유하였습니다.`,
      );
    }

    // --공유 링크 저장
    const sharedLink = this.sharedLinkRepository.create({
      userId: user.id,
      linkId,
    });

    await this.sharedLinkRepository.save(sharedLink);

    return { message: '링크 공유가 완료되었습니다.' };
  }
}
