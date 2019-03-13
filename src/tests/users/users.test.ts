process.env.NODE_ENV = "test";

import { Response } from "express";
import { IUserModel, User } from "../../models/user.schema";

import bcrypt from "bcrypt";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
const should = chai.should();

chai.use(chaiHttp);

const createUser = (done) => {
  User.create({
    email: "blah@example.com",
    name: "Thomas Evans",
    passwordHash: bcrypt.hashSync("eightcharacterpassword", 10)
  }).then((user: IUserModel) => {
    done(user);
  });
};

describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });

  describe("GET /users", () => {
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/users")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("GET /users/{id}", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .get("/users/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the user is not found.", (done) => {
      chai
        .request(app)
        .get("/users/5c885d0ef35e8503bbf9fbdd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should get a single user", (done) => {
      createUser((user) => {
        chai
          .request(app)
          .get("/users/" + user._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("email");
            res.body.should.not.have.property("passwordHash");
            res.body.should.have.property("createdAt");
            res.body.should.have.property("updatedAt");
            done();
          });
      });
    });
  });

  describe("PUT /users", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .put("/users/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the user is not found.", (done) => {
      chai
        .request(app)
        .put("/users/5c885d0ef35e8503bbf9fbdd")
        .send({ title: "blah" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should update a user", (done) => {
      createUser((user) => {
        user.name = "New User!";

        chai
          .request(app)
          .put("/users/" + user._id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("email");
            res.body.should.not.have.property("passwordHash");
            res.body.should.have.property("_id");
            done();
          });
      });
    });
  });

  describe("POST /users", () => {
    it("should create a user", (done) => {
      const user = {
        email: "blah@example.com",
        name: "Thomas Evans",
        password: "testpassword"
      };

      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.not.have.property("passwordHash");
          res.body.should.have.property("_id");
          done();
        });
    });

    it("should not create a user without an email", (done) => {
      const user = {
        name: "Thomas Evans",
        password: "testpassword"
      };

      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          done();
        });
    });
  });

  describe("Authenticating", () => {
    it("should authenticate a user properly", (done) => {
      createUser((user) => {
        const req = {
          email: user.email,
          password: "eightcharacterpassword"
        };

        chai
          .request(app)
          .post("/users/signin")
          .send(req)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it("should create a JWT properly on successful authentication", (done) => {
      createUser((user) => {
        const req = {
          email: user.email,
          password: "eightcharacterpassword"
        };

        chai
          .request(app)
          .post("/users/signin")
          .send(req)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("token");
            done();
          });
      });
    });

    it("should return a 401 if the password is incorrect.", (done) => {
      createUser((user) => {
        const req = {
          email: user.email,
          password: "other password"
        };

        chai
          .request(app)
          .post("/users/signin")
          .send(req)
          .end((err, res) => {
            res.should.have.status(401);
            done();
          });
      });
    });
  });

  describe("Delete /users", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .delete("/users/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the user is not found.", (done) => {
      chai
        .request(app)
        .delete("/users/5c885d0ef35e8503bbf9fbdd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should permanently delete a user", (done) => {
      createUser((user) => {
        chai
          .request(app)
          .delete("/users/" + user._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
});
