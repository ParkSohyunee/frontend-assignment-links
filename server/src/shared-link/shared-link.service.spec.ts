import { Test, TestingModule } from '@nestjs/testing';
import { SharedLinkService } from './shared-link.service';

describe('SharedLinkService', () => {
  let service: SharedLinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedLinkService],
    }).compile();

    service = module.get<SharedLinkService>(SharedLinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
