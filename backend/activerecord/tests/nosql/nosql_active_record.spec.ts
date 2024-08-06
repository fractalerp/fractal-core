import { expect } from "chai";
import * as sinon from "sinon";
import mongoose from "mongoose";
import { NoSqlActiveRecord } from "../../nosql/nosql_active_record";
import { userDocumentSchema, IUserDocument } from "../fixtures/user_document";
import { userData } from "../fixtures/user_data";

describe("NoSqlActiveRecord", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  let nosqlActiveRecord!: NoSqlActiveRecord<IUserDocument>;
  // Set up on every test
  beforeEach(() => {
    nosqlActiveRecord = new NoSqlActiveRecord<IUserDocument>("Document", userDocumentSchema);
  });

  it("should find one document", async () => {
    modelMock = mongoose.Model.findOne = sandbox
      .stub()
      .returns(Promise.resolve(userData));

    modelMock.resolves(userData);

    const result = await nosqlActiveRecord.findOne({});

    expect(result).to.deep.equal(userData);
    expect(modelMock.calledWith({})).to.be.true;
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
