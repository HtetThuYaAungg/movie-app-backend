import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppController', () => {


  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [AppService],
    }).compile();

  });


});
