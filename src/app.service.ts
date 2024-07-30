import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UpdateUserPassDto } from './users/dto/update-user-pass.dto';
import { UpdateUserAdminDto } from './users/dto/update-user-admin.dto';
import * as QRcode from 'qrcode';
import { CreateCategoriesDto } from './categories/dto/create-categories.dto';
import { CategoriesService } from './categories/categories.service';
import { EventsService } from './events/events.service';
import { CreateEventDto } from './events/dto/create-events.dto';
import { UpdateCategoriesDto } from './categories/dto/update-categories.dto';
import { UpdateEventDto } from './events/dto/update-events.dto';
import { CreateReservedDto } from './reserved/dto/create-reserved.dto';
import { ReservedService } from './reserved/reserved.service';
import * as puppeteer from 'puppeteer';
import { UpdateEventTicketDto } from './events/dto/update-events-ticket.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly eventsService: EventsService,
    private readonly reservedService: ReservedService,
  ) {}

  async getAllUsers() {
    const data = await this.usersService.findAll();
    return data;
  }

  async getUserByEmail(email) {
    const data = await this.usersService.findByEmail(email);
    return data;
  }

  // get All Categories
  async getAllCategories() {
    const data = await this.categoriesService.findAll();
    return data;
  }

  // get All events
  async getAllEvents() {
    const data = await this.eventsService.findAll();
    return data;
  }

  // get all reserved
  async getAllReserved() {
    const data = await this.reservedService.findAll();
    return data;
  }

  async ShowUser(id: string) {
    const data = await this.usersService.findOne(id);
    return data;
  }

  async showEvents(id: string) {
    const data = await this.eventsService.findOne(id);
    return data;
  }

  // show category
  async showCategory(id: string) {
    const data = await this.categoriesService.findOne(id);
    return data;
  }

  //delete user
  async deleteUser(id: string) {
    const data = await this.usersService.delete(id);
    return data;
  }

  // delete Category
  async deleteCategory(id: string) {
    const data = await this.categoriesService.delete(id);
    return data;
  }

  // delete Event
  async deleteEvent(id: string) {
    const data = await this.eventsService.deleteE(id);
    return data;
  }

  dash() {
    const msg = 'dashboard';
    return msg;
  }

  getHello(): string {
    const msg = 'Welcome to the Nest Team';
    return msg;
  }

  signup() {
    const msg = 'signup';
    return msg;
  }

  signin() {
    const msg = 'signin';
    return msg;
  }

  // provider create a new user
  createUser(user: CreateUserDto) {
    return this.usersService.create(user);
  }

  // provider create a new category
  createCategory(categories: CreateCategoriesDto) {
    return this.categoriesService.create(categories);
  }

  // provider create a new event
  createEvent(event: CreateEventDto) {
    return this.eventsService.create(event);
  }

  // provider create a new event
  createReservation(reserved: CreateReservedDto) {
    return this.reservedService.create(reserved);
  }

  // find user by email
  findByEmail(email: string) {
    return this.usersService.findByEmail(email);
  }

  // regex match for user email
  async validateEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }

  // regex match for number
  async validateNumber(number: string) {
    const regex = /^[0-9]+$/;
    return regex.test(number);
  }

  // update user profile
  updateUser(id: string, user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  // update user profile password
  updateUserPassword(id: string, user: UpdateUserPassDto) {
    return this.usersService.updateUserPassword(id, user);
  }

  // found user by id
  findUserById(id: string) {
    return this.usersService.findUserById(id);
  }

  // update user aadmin
  updateUserAdmin(id: string, user: UpdateUserAdminDto) {
    return this.usersService.updateUserAdmin(id, user);
  }

  // update categories
  updateCategory(id: string, categories: UpdateCategoriesDto) {
    return this.categoriesService.updateCategory(id, categories);
  }

  // update events
  updateEvent(id: string, event: UpdateEventDto) {
    return this.eventsService.updateEvent(id, event);
  }

  // update ticket of event
  decreaseTicket(id: string, event: UpdateEventTicketDto) {
    return this.eventsService.updateEventTicket(id, event);
  }

  async generateQrcode(id) {
    const dataUrl = 'https://1p29zmvx-3000.uks1.devtunnels.ms/reserver/' + id;
    try {
      return await QRcode.toDataURL(dataUrl).then();
    } catch (error) {
      console.error(error);
    }
  }

  async generatePDF() {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../views/ticket.hbs'),
      'utf-8',
    );

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(content);

    const buffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        left: '0px',
        top: '0px',
        right: '0px',
        bottom: '0px',
      },
    });

    await browser.close();

    return buffer;
  }
}
