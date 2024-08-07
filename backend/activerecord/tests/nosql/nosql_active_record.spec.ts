import { expect } from "chai";
import * as sinon from "sinon";
import mongoose from "mongoose";
import { NoSqlActiveRecord } from "../../nosql/nosql_active_record";
import { userDocumentSchema, IUserDocument } from "../fixtures/user_document";
import { userData } from "../fixtures/user_data";

describe("NoSqlActiveRecord", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const nosqlActiveRecord = new NoSqlActiveRecord<IUserDocument>("Document", userDocumentSchema);

  before(() => {
    modelMock = sandbox.stub();
    mongoose.Model.findOne = modelMock;
    mongoose.Model.find = modelMock;
  });

  it("should find one document", async () => {
    const findOneMock = modelMock.returns(Promise.resolve(userData));

    findOneMock.resolves(userData);

    const result = await nosqlActiveRecord.findOne({});

    expect(result).to.deep.equal(userData);
    expect(modelMock.calledWith({})).to.be.true;
  });

  it("should find list of documents", async () => {
    const findMock = modelMock.returns(Promise.resolve([userData]));

    findMock.resolves([userData]);

    const result = await nosqlActiveRecord.find({});

    expect(result.length).to.equal(1);
    expect(result[0]).to.deep.equal(userData);
    expect(findMock.calledWith({})).to.be.true;
  });

  it("should create a document", async () => {
    const createMock = sinon
      // @ts-ignore
      .stub(nosqlActiveRecord.model.prototype, "save")
      .returns(Promise.resolve(userData));

    createMock.resolves(userData);

    const result = await nosqlActiveRecord.create(userData);

    expect(result).to.deep.equal(userData);
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
