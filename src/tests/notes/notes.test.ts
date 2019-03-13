process.env.NODE_ENV = "test";

import { INoteModel, Note } from "../../models/note.schema";

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../app";
const should = chai.should();

chai.use(chaiHttp);

const createNote = (done) => {
  Note.create({
    description: "Test Note Desc",
    title: "Test Note"
  }).then((note: INoteModel) => {
    done(note);
  });
};

describe("Notes", () => {
  beforeEach((done) => {
    Note.remove({}, (err) => {
      done();
    });
  });

  describe("GET /notes", () => {
    it("should get all notes", (done) => {
      chai
        .request(app)
        .get("/notes")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("GET /notes/{id}", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .get("/notes/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the note is not found.", (done) => {
      chai
        .request(app)
        .get("/notes/5c885d0ef35e8503bbf9fbdd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should get a single note", (done) => {
      const note = {
        description: "Second Test Note",
        title: "Test Note!"
      };

      createNote((note) => {
        chai
          .request(app)
          .get("/notes/" + note._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("description");
            res.body.should.have.property("updatedAt");
            res.body.should.have.property("createdAt");
            res.body.should.have.property("recycled");
            res.body.should.have.property("isPublic");
            done();
          });
      });
    });
  });

  describe("PUT /notes", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .put("/notes/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the note is not found.", (done) => {
      chai
        .request(app)
        .put("/notes/5c885d0ef35e8503bbf9fbdd")
        .send({ title: "blah" })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should update a note", (done) => {
      createNote((note) => {
        note.description = "New Note!";

        chai
          .request(app)
          .put("/notes/" + note._id)
          .send(note)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("description");
            res.body.should.have.property("updatedAt");
            res.body.should.have.property("createdAt");
            res.body.should.have.property("recycled");
            res.body.should.have.property("isPublic");
            res.body.should.have.property("_id");
            done();
          });
      });
    });

    it("should update a note without a description", (done) => {
      createNote((note) => {
        note.description = "";

        chai
          .request(app)
          .put("/notes/" + note._id)
          .send(note)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("description");
            res.body.should.have.property("updatedAt");
            res.body.should.have.property("createdAt");
            res.body.should.have.property("recycled");
            res.body.should.have.property("isPublic");
            res.body.should.have.property("_id");
            done();
          });
      });
    });

    it("should not update a note without a title", (done) => {
      createNote((note) => {
        note.description = "";
        note.title = "";

        chai
          .request(app)
          .put("/notes/" + note._id)
          .send(note)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("errors");
            done();
          });
      });
    });
  });

  describe("POST /notes", () => {
    it("should create a note", (done) => {
      const note = {
        description: "Second Test Note",
        title: "Test Note!"
      };

      chai
        .request(app)
        .post("/notes")
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("isPublic");
          res.body.should.have.property("recycled");
          res.body.should.have.property("_id");
          done();
        });
    });

    it("should create a note without a description", (done) => {
      const note = {
        title: "Test Title"
      };

      chai
        .request(app)
        .post("/notes")
        .send(note)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("recycled");
          res.body.should.have.property("isPublic");
          res.body.should.have.property("_id");
          done();
        });
    });

    it("should not create a note without a title", (done) => {
      const note = {
        description: "Second Test Note"
      };

      chai
        .request(app)
        .post("/notes")
        .send(note)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          done();
        });
    });
  });

  describe("Recycle /notes", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .post("/notes/blah/recycle")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the note is not found.", (done) => {
      chai
        .request(app)
        .post("/notes/5c885d0ef35e8503bbf9fbdd/recycle")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should recycle a note", (done) => {
      createNote((note) => {
        chai
          .request(app)
          .post("/notes/" + note._id + "/recycle")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("recycled");
            res.body.recycled.should.be.eql(true);
            done();
          });
      });
    });
  });

  describe("Restore /notes", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .post("/notes/blah/restore")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the note is not found.", (done) => {
      chai
        .request(app)
        .post("/notes/5c885d0ef35e8503bbf9fbdd/restore")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should restore a note", (done) => {
      createNote((note) => {
        chai
          .request(app)
          .post("/notes/" + note._id + "/restore")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("recycled");
            res.body.recycled.should.be.eql(false);
            done();
          });
      });
    });
  });
  describe("Delete /notes", () => {
    it("should return a 400 if the id sent is not a valid mongo id.", (done) => {
      chai
        .request(app)
        .delete("/notes/blah")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it("should return a 404 if the note is not found.", (done) => {
      chai
        .request(app)
        .delete("/notes/5c885d0ef35e8503bbf9fbdd")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("should permanently delete a note", (done) => {
      createNote((note) => {
        chai
          .request(app)
          .delete("/notes/" + note._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("recycled");
            res.body.recycled.should.be.eql(false);
            done();
          });
      });
    });
  });
});
