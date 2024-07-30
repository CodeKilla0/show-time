import {
  Get,
  Controller,
  Render,
  Body,
  Post,
  // Redirect,
  Param,
  Response,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UpdateUserPassDto } from './users/dto/update-user-pass.dto';
import { UpdateUserAdminDto } from './users/dto/update-user-admin.dto';
import { CreateCategoriesDto } from './categories/dto/create-categories.dto';
import { CreateEventDto } from './events/dto/create-events.dto';
import { UpdateCategoriesDto } from './categories/dto/update-categories.dto';
import { UpdateEventDto } from './events/dto/update-events.dto';
import { CreateReservedDto } from './reserved/dto/create-reserved.dto';
import { UpdateEventTicketDto } from './events/dto/update-events-ticket.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async index(@Response() response, @Request() req) {
    const session = req.session.userId;
    if (session) {
      const user = await this.appService.findUserById(req.session.userId);
      const initName = user.prenom[0];
      const admin = user.admin;
      const categories = await this.appService.getAllCategories();
      const events = await this.appService.getAllEvents();
      return { categories, events, session, initName, admin };
    } else {
      const categories = await this.appService.getAllCategories();
      const events = await this.appService.getAllEvents();
      return { categories, events, session };
    }
  }

  //show user profile by id
  @Get('/show/:id')
  @Render('show')
  async showUser(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const data = await this.appService.ShowUser(id);
      if (data) {
        return { data };
      } else {
        return { data };
      }
    } else {
      return res.redirect('login');
    }
  }

  //show category by id
  @Get('/show_cat/category/:id')
  @Render('show_cat')
  async showCategory(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const data = await this.appService.showCategory(id);
      if (data) {
        return { data };
      } else {
        return { data };
      }
    } else {
      return res.redirect('login');
    }
  }

  //show event
  @Get('/show/events/:id')
  @Render('view_events')
  async showEvent(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const user = await this.appService.findUserById(req.session.userId);
      const categories = await this.appService.getAllCategories();
      const data = await this.appService.showEvents(id);
      if (data) {
        return { data, categories, user };
      } else {
        return { data, categories, user };
      }
    } else {
      return res.redirect('http://localhost:3000/login');
    }
  }

  //show event by id
  @Get('/show_event/events/:id')
  @Render('show_event')
  async showEvents(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const categories = await this.appService.getAllCategories();
      const data = await this.appService.showEvents(id);
      if (data) {
        return { data, categories };
      } else {
        return { data, categories };
      }
    } else {
      return res.redirect('https://localhost:3000/login');
    }
  }

  //delete user profile by id
  @Get('/delete/:id')
  // @Redirect('http://localhost:3000/dashboard', 301)
  async deleteUser(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const data = await this.appService.deleteUser(id);
      if (data) {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      } else {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      }
    } else {
      return res.redirect('login');
    }
  }

  // delete Category
  @Get('/delete/category/:id')
  async deleteCategory(
    @Param('id') id: string,
    @Response() res,
    @Request() req,
  ) {
    if (req.session.userId) {
      const data = await this.appService.deleteCategory(id);
      if (data) {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      } else {
        return res.redirect(302, 'http://localhost:3000/dashboard');
      }
    } else {
      return res.redirect('login');
    }
  }

  // delete Event
  @Get('/delete/events/:id')
  async deleteEvent(@Param('id') id: string, @Response() res, @Request() req) {
    if (req.session.userId) {
      const data = await this.appService.deleteEvent(id);
      if (data) {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      } else {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      }
    } else {
      return res.redirect('login');
    }
  }

  @Get('events')
  @Render('events')
  async events(@Response() res, @Request() req) {
    if (req.session.userId) {
      // get user information with her session
      const user = await this.appService.findUserById(req.session.userId);
      if (user) {
        return { user };
      } else {
        return { user };
      }
    } else {
      return res.redirect('login');
    }
  }

  @Get('signup')
  @Render('signup')
  root() {
    return { msg: 'Signup' };
  }

  @Get('dashboard')
  @Render('dashboard2')
  async root02(@Request() req, @Response() res) {
    // recuperer tous les reservation
    const reserved = await this.appService.getAllReserved();
    const users = await this.appService.getAllUsers();
    const categories = await this.appService.getAllCategories();
    const events = await this.appService.getAllEvents();
    const Allusers = users.length;
    const Allreserved = reserved.length;
    const AllEvents = events.length;
    const AllCate = categories.length;

    if (req.session.userId) {
      // get user information with her session
      const user = await this.appService.findUserById(req.session.userId);
      if (user && user.admin === true) {
        return {
          user,
          users,
          categories,
          events,
          Allusers,
          reserved,
          Allreserved,
          AllEvents,
          AllCate,
        };
      } else if (user && user.admin === false) {
        return res.redirect(302, 'http://localhost:3000/');
      }
    } else {
      return res.redirect('login');
    }
  }

  @Get('login')
  @Render('login')
  root01(@Request() req, @Response() res) {
    if (req.session.userId) {
      return res.redirect('dashboard');
    } else {
      return { msg: 'Signin' };
    }
  }
  // create a new category
  @Post('createCategory')
  async createCategory(
    @Body() createCategoryDto: CreateCategoriesDto,
    @Request() req,
    @Response() res,
  ) {
    const createCat = await this.appService.createCategory(createCategoryDto);
    if (!createCat) {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    } else {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    }
  }

  // create a new event
  @Post('createEvent')
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @Request() req,
    @Response() res,
  ) {
    const createEvent = await this.appService.createEvent(createEventDto);
    if (!createEvent) {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    } else {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    }
  }

  // create reservation
  @Post('createReservation')
  async createReservation(
    @Param('id') id: string,
    @Body() createReservedDto: CreateReservedDto,
    @Request() req,
    @Response() res,
  ) {
    const createReservation =
      await this.appService.createReservation(createReservedDto);
    if (!createReservation) {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    } else {
      return res.redirect(301, 'http://localhost:3000/dashboard');
    }
  }

  // create user profile and login user routes
  @Post('register')
  async createUser(
    @Body() user: CreateUserDto,
    @Body('nom') userName: string,
    @Body('prenom') userPrenom: string,
    @Body('ville') userVille: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
    @Body('password_confirm') UserPassConfirm: string,
    @Body('numero') userNumber: string,
    @Response() res,
  ) {
    const saltOrRounds = 10;
    const foundUser = await this.appService.findByEmail(userEmail);
    const ValideEmail = await this.appService.validateEmail(userEmail);
    const valideNumber = await this.appService.validateNumber(userNumber);
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);

    if (
      userName.trim() != '' &&
      userPrenom.trim() != '' &&
      userVille.trim() != '' &&
      userPassword.trim() != '' &&
      UserPassConfirm.trim() != ''
    ) {
      if (!foundUser) {
        if (ValideEmail) {
          if (valideNumber && userNumber.length === 10) {
            if (userPassword === UserPassConfirm) {
              if (userPassword.length === 8) {
                await this.appService.createUser({
                  nom: user.nom,
                  prenom: user.prenom,
                  email: userEmail,
                  ville: user.ville,
                  numero: user.numero,
                  password: hashedPassword,
                  active: 1,
                  admin: false,
                });
                return res.redirect('http://localhost:3000/login');
              } else {
                return res.render('signup', {
                  error_pwd:
                    'Le mot de passe doit contenir 8 caractères minimum',
                });
              }
            } else {
              return res.render('signup', {
                error_pwd: 'Le mot de passe ne correspond pas',
              });
            }
          } else {
            return res.render('signup', {
              error_num: 'numero de telephone invalide',
            });
          }
        } else {
          return res.render('signup', {
            error_mail: 'email invalide',
          });
        }
      } else {
        return res.render('signup', {
          error_mail: 'email deja utilisé',
        });
      }
    } else {
      return res.render('signup', {
        error_empty: 'Veuillez remplir tous les champs',
      });
    }
  }

  // post user login
  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Response() res,
    @Request() req,
  ) {
    // v
    const foundUser = await this.appService.findByEmail(email);
    if (foundUser) {
      const passwordValid = await bcrypt.compare(password, foundUser.password);

      if (passwordValid) {
        if (foundUser.admin == true) {
          //session
          req.session.userId = foundUser['_id'].toString();
          return res.redirect(301, 'http://localhost:3000/dashboard');
        } else {
          //session
          req.session.userId = foundUser['_id'].toString();
          return res.redirect(302, 'http://localhost:3000/');
        }
      } else {
        return res.render('login', {
          error: 'identifiants incorrects',
        });
      }
    } else {
      return res.render('login', {
        error: 'identifiants incorrects',
      });
    }
  }

  // update user profile
  @Post('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Response() res,
  ) {
    const updateUserDto: UpdateUserDto = {
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      ville: user.ville,
      numero: user.numero,
    };
    const data = await this.appService.updateUser(id, updateUserDto);
    if (data) {
      return res.redirect(301, 'http://localhost:3000/show/' + id);
    } else {
      return res.redirect(301, 'http://localhost:3000/show/' + id);
    }
  }

  @Post('/update/password/:id')
  async updateUserPassword(
    @Param('id') id: string,
    @Body('old-pass') oldPassword: string,
    @Body('password') password: string,
    @Body('conf-pass') confPassword: string,
    @Response() res,
  ) {
    const saltOrRounds = 10;
    const foundUser = await this.appService.findUserById(id);

    if (foundUser) {
      const passwordValid = await bcrypt.compare(
        oldPassword,
        foundUser.password,
      );
      if (passwordValid) {
        if (password === confPassword) {
          const hashedPassword = await bcrypt.hash(password, saltOrRounds);
          const updateUserPassDto: UpdateUserPassDto = {
            password: hashedPassword,
          };
          const data = await this.appService.updateUserPassword(
            id,
            updateUserPassDto,
          );
          if (data) {
            return res.redirect(301, 'http://localhost:3000/show/' + id);
          } else {
            return res.redirect(301, 'http://localhost:3000/show/' + id);
          }
        }
      }
    }
  }

  // logout user
  @Get('logout')
  logout(@Response() res, @Request() req) {
    req.session.destroy(() => {
      res.redirect('http://localhost:3000/login');
    });
  }

  // update user admin
  @Post('/update/admin/:id')
  async updateUserAdmint(
    @Param('id') id: string,
    @Body() user: UpdateUserAdminDto,
    @Response() res,
    // @Request() req,
  ) {
    // const foundUser = await this.appService.findUserById(id);

    if (user.admin === false) {
      const updateUserAdminDto: UpdateUserAdminDto = {
        admin: true,
      };
      const data = await this.appService.updateUserAdmin(
        id,
        updateUserAdminDto,
      );
      if (data) {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      } else {
        return res.redirect(301, 'http://localhost:3000/dashboard');
      }
    }
  }

  // update category
  @Post('/update/category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categories: UpdateCategoriesDto,
    @Response() res,
  ) {
    const updateCategoriesDto: UpdateCategoriesDto = {
      title: categories.title,
      description: categories.description,
    };
    const data = await this.appService.updateCategory(id, updateCategoriesDto);
    if (data) {
      return res.redirect(301, 'http://localhost:3000/show_cat/category/' + id);
    } else {
      return res.redirect(301, 'http://localhost:3000/show_cat/category/' + id);
    }
  }

  // update events
  @Post('/update/event/:id')
  async updateEvent(
    @Param('id') id: string,
    @Body() event: UpdateEventDto,
    @Response() res,
  ) {
    const updateEventDto: UpdateEventDto = {
      title: event.title,
      description: event.description,
      categoriesId: event.categoriesId,
      ville: event.ville,
      prix: event.prix,
      ticket: event.ticket,
      lieu: event.lieu,
      date: event.date,
      file: event.file,
      numero: event.numero,
      code_events: event.code_events,
      webside: event.webside,
      localistion: event.localistion,
    };
    const data = await this.appService.updateEvent(id, updateEventDto);
    if (data) {
      return res.redirect(301, 'http://localhost:3000/show_event/events/' + id);
    } else {
      return res.redrect(301, 'http://localhost:3000/show_event/events/' + id);
    }
  }

  @Post('reserved/:id')
  @Render('ticket')
  async generate(
    @Param('id') id: string,
    @Body() reserver: CreateReservedDto,
    @Request() req,
  ) {
    // create reservation
    const createReservedDto: CreateReservedDto = {
      eventId: reserver.eventId,
      userId: req.session.userId,
    };
    await this.appService.createReservation(createReservedDto);
    // found events
    const foundEvents = await this.appService.showEvents(id);
    // decrease ticket of event found
    const nbr_de_ticket = foundEvents.ticket - 1;
    const updateEventTicketDto: UpdateEventTicketDto = {
      ticket: nbr_de_ticket,
    };
    await this.appService.decreaseTicket(id, updateEventTicketDto);

    const user = await this.appService.findUserById(req.session.userId);
    const categories = await this.appService.getAllCategories();
    const data = await this.appService.showEvents(id);
    const qrCode = await this.appService.generateQrcode(id);
    return { qrCode, user, categories, data };
  }

  @Get('reserver/:id')
  @Render('reservation')
  async generateQr(@Param('id') id: string, @Request() req) {
    const user = await this.appService.findUserById(req.session.userId);
    const categories = await this.appService.getAllCategories();
    const data = await this.appService.showEvents(id);
    const qrCode = await this.appService.generateQrcode(id);
    return { qrCode, user, categories, data };
  }

  @Get('download/:id/pdf')
  async getInvoicePdfByUUID(@Param('id') id: string, @Response() res) {
    const buffer = await this.appService.generatePDF();
    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Length': buffer.length,

      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });

    res.end(buffer);
  }
}
