import { Test, TestingModule } from '@nestjs/testing';
import { SharedLinkController } from './shared-link.controller';

describe('SharedLinkController', () => {
  let controller: SharedLinkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedLinkController],
    }).compile();

    controller = module.get<SharedLinkController>(SharedLinkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
