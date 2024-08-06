// import { expect } from "chai";
// import { Sequelize, Model, DataTypes } from "sequelize";
// import * as sinon from "sinon";
// import { RelationalActiveRecord } from "../../relational/relational_active_record";
// import { IUserTable, userTableSchema } from "../fixtures/user_table";

describe("RelationalActiveRecord", () => {
  // let sequelizeMock: sinon.SinonStubbedInstance<Sequelize>;
  // let modelMock: sinon.SinonStubbedInstance<typeof Model>;
  // let relationalActiveRecord: RelationalActiveRecord<IUserTable>;
  // const modelName = "User";

  // beforeEach(() => {
  //   sequelizeMock = sinon.createStubInstance(Sequelize);
  //   modelMock = sinon.stub(Model);
  //   relationalActiveRecord = new RelationalActiveRecord<IUserTable>(modelName, userTableSchema);
  // });

  // afterEach(() => {
  //   sinon.restore();
  // });

  // it("should create a record", async () => {
  //   const mockData: IUserTable = {
  //     firstName: "first name",
  //     lastName: "last name"
  //   };

  //   const tableModel = sequelizeMock.define(
  //     modelName,
  //     {
  //       firstName: {
  //         type: DataTypes.STRING,
  //         allowNull: false
  //       },
  //       lastName: {
  //         type: DataTypes.STRING
  //       }
  //     }
  //   );
  //   const modelInstance = tableModel.build();

  //   modelMock.create.resolves(modelInstance);

  //   const result = await relationalActiveRecord.create(mockData);

  //   expect(result).to.deep.equal(mockData);
  //   // expect(modelMock.create.calledWith(modelInstance)).to.be.true;
  // });
});
