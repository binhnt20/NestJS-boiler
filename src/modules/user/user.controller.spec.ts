import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const createUserDto: CreateUserDto = {
  username: 'username#1',
  password: 'password #1',
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockImplementation((user: CreateUserDto) => Promise.resolve({ id: '1', ...user })),
            findAll: jest.fn().mockResolvedValue([
              {
                username: 'username#1',
                password: 'password #1',
              },
              {
                username: 'username#2',
                password: 'password #2',
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                username: 'username#1',
                password: 'password #1',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      userController.create(createUserDto);
      expect(userController.create(createUserDto)).resolves.toEqual({
        id: '1',
        ...createUserDto,
      });
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      userController.findAll();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(userController.findOne(1)).resolves.toEqual({
        username: 'username#1',
        password: 'password #1',
        id: 1,
      });
      expect(userService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      userController.remove('2');
      expect(userService.remove).toHaveBeenCalled();
    });
  });
});
