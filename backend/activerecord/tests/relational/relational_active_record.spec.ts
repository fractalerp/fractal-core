import { expect } from "chai";
import * as sinon from "sinon";
import { RelationalActiveRecord } from "../../../activerecord/relational/relational_active_record";
import { userOneData } from "../fixtures/user_data";
import { IUserTable, userTableSchema } from "../fixtures/user_table";

describe("RelationalActiveRecord", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const relationalActiveRecord = new RelationalActiveRecord<IUserTable>("Table", userTableSchema);
  before(() => {
    modelMock = sandbox.stub();
    // @ts-ignore
    relationalActiveRecord.model.findOne = modelMock;
    // @ts-ignore
    relationalActiveRecord.model.findAll = modelMock;
  });

  it("should find one row", async () => {
    const findOneMock = modelMock.returns(Promise.resolve(userOneData));

    findOneMock.resolves(userOneData);

    const result = await relationalActiveRecord.findOne({});

    expect(result).to.deep.equal(userOneData);
    expect(modelMock.calledWith({})).to.be.true;
  });

  it("shoul find list of rows", async () => {
    const findMock = modelMock.returns(Promise.resolve([userOneData]));

    findMock.resolves([userOneData]);

    const result = await relationalActiveRecord.find({});

    expect(result.length).to.equal(1);
    expect(result[0]).to.deep.equal(userOneData);
    expect(findMock.calledWith({})).to.be.true;
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});
