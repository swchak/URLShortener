const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = require("expect");

chai.use(chaiHttp);

describe("POST /shorten-url", () => {
  it("Shortens a long url", (done) => {
    const input = {
      longUrl:
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number",
    };
    chai
      .request(app)
      ["post"]("/shorten-url")
      .set("Content-Type", "application/json")
      .send(input)
      .end((err, res) => {
        expect(res.status).toBe(200);
        done(err);
      });
  });
});
