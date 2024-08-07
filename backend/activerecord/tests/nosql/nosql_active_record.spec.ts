import { expect } from "chai";
import * as sinon from "sinon";
import mongoose from "mongoose";
import { NoSqlActiveRecord } from "../../nosql/nosql_active_record";
import { userDocumentSchema, IUserDocument } from "../fixtures/user_document";
import { userOneData, userTwoData } from "../fixtures/user_data";

describe("NoSqlActiveRecord", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const nosqlActiveRecord = new NoSqlActiveRecord<IUserDocument>("Document", userDocumentSchema);

  before(() => {
    modelMock = sandbox.stub();
    mongoose.Model.findOne = modelMock;
    mongoose.Model.find = modelMock;
    mongoose.Model.findByIdAndUpdate = modelMock;
    mongoose.Model.findByIdAndDelete = modelMock;
  });

  it("should find one document", async () => {
    const findOneMock = modelMock.returns(Promise.resolve(userOneData));

    findOneMock.resolves(userOneData);

    const result = await nosqlActiveRecord.findOne({});

    expect(result).to.deep.equal(userOneData);
    expect(modelMock.calledWith({})).to.be.true;
  });

  it("should find list of documents", async () => {
    const findMock = modelMock.returns(Promise.resolve([userOneData]));

    findMock.resolves([userOneData]);

    const result = await nosqlActiveRecord.find({});

    expect(result.length).to.equal(1);
    expect(result[0]).to.deep.equal(userOneData);
    expect(findMock.calledWith({})).to.be.true;
  });

  it("should create a document", async () => {
    const createMock = sinon
      // @ts-ignore
      .stub(nosqlActiveRecord.model.prototype, "save")
      .returns(Promise.resolve(userOneData));

    createMock.resolves(userOneData);

    const result = await nosqlActiveRecord.create(userOneData);

    expect(result).to.deep.equal(userOneData);
  });

  it("should update a document", async () => {
    const updateMock = modelMock.returns(Promise.resolve(userTwoData));
    updateMock.resolves(userTwoData);
    // @ts-ignore
    const result = await nosqlActiveRecord.update(userOneData._id, userTwoData);

    expect(result).to.deep.equal(userTwoData);
  });

  it("should delete a document", async () => {
    const deleteMock = modelMock.returns(Promise.resolve(undefined));

    deleteMock.resolves(undefined);
    // @ts-ignore
    const result = await nosqlActiveRecord.delete(userOneData._id);

    expect(result).to.equal(undefined);
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
