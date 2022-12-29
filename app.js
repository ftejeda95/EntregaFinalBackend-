// Importar Funciones
import express  from "express";
import useragent from "express-useragent";
import path from "path";
import http from "http";
import Routers from "./routers/index.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./model/user.js";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import config from "./config.js";
import bcrypt from 'bcrypt'
import nodemailer from "nodemailer";
import logger from "./logger.js";
// import { UsuariosDao } from "./daos/index.js";

//Iniciar App
const app = express();

//Crear Puerto
const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//Configurar la App
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.use(express.json());
app.set("views", path.join(__dirname, "views/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(useragent.express());
//configuro Motor de Plantillas

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
});
//configuro los Router





//configuro Error

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
//Crear Servidor

const server = http.createServer(app);
passport.use(
  "sign-in",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (!user) {
            logger.info(`User with ${email} not found.`);

            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            logger.info("Invalid Password");

            return done(null, false);
          }
          done(null, user);
        })
        .catch((error) => {
          logger.error("Error in sign-in", error.message);

          done(error, false);
        });
    }
  )
);

passport.use(
  "sign-up",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      UserModel.findOne({ email })
        .then((user) => {
          if (user) {
            logger.info(`User ${email} already exists.`);

            return done(null, false);
          } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hash;

            return UserModel.create(req.body);
          }
        })
        .then( async (newUser) => {
          logger.info(newUser);
           if (newUser){
            const opts = {
              from: "Servidor Node",
              to: process.env.EMAIL_HOST,
              subject: "Nuevo registro de Cliente",
              html: `<h1>Nuevo cliente registrado</h1> 
                        <ul><li>password:${newUser.password}/li>
                        <li>email:${newUser.email}</li>
                        <li>nombre:${newUser.nombre}</li>
                        <li>direccion:${newUser.direccion}</li>
                        <li>edad:${newUser.edad}</li>
                        <li>telefono:${newUser.telefono}</li>
                        <li>foto:${newUser.foto}</li></ul>`,
            };
            const result = await transporter.sendMail(opts);
            logger.info(`User ${newUser.email} registration succesful.`);
            logger.info(`Email enviado: ${result} `);
            done(null, newUser);
          } else {
            throw new Error("User already exists");
          }
        })
        .catch((error) => {
          logger.error("Error in sign-up", error.message);
          return done(error);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  UserModel.findOne({ _id })
    .then((user) => done(null, user))
    .catch(done);
});
app.use(
  session({
    secret: "K&UV1tlls3T0",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(
//   session({
//     store: new MongoStore({
//       mongoUrl: config.MONGO_URL.URI,
//       ttl: 600,
//     }),
//     secret: "b$x0J77c#20k",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

app.use("/", Routers);
//Escucho Servidor

server.listen(PORT, () => {
  logger.info(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  logger.info(`http://localhost:${server.address().port}`);
  logger.info(`Environment:${ENV}`);
});
server.on("error", (error) => logger.info(`Error en servidor ${error}`));
