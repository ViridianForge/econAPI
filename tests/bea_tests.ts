import { BEA } from "../apis/bea";
import { resolve } from "path";
import { config } from "dotenv";

import { expect } from "chai";
import "mocha";

config({ path: resolve(__dirname, ".env") });

const api_key: string = process.env.BEA_APIKEY ?? "FAILED_READ";
const test_api: BEA = new BEA(api_key, "JSON");

describe("Testing BEA Typescript API", () => {
  it("GetDataSetList should return list of all datasets", async () => {
    const response = await test_api.getDataSetList();
    expect(response.status).equals(200, "Successful status");
  });

  it("GetParameterList should return all parameters for IIP", async () => {
    const response = await test_api.getParameterList("IIP");
    expect(response.status).equals(200, "Successful status");
  });

  it("GetParameterValues should return values for TradeDirection Parameter", async () => {
    const response = await test_api.getParameterValues(
      "INTLSERVTRADE",
      "TradeDirection"
    );
    expect(response.status).equals(200, "Successful status");
  });

  it("GetParameterValuesFiltered should returned a filtered list of parameter values", async () => {
    const params: Map<string, string> = new Map<string, string>();
    params.set("TableName", "SAINC1");
    const response = await test_api.getParameterValuesFiltered(
      "REGIONAL",
      "LINECODE",
      params
    );
    expect(response.status).equals(200, "Successful status");
  });

  it("GetData should return a requested body of data.", async () => {
    const params: Map<string, string> = new Map<string, string>();
    params.set("TableName", "CAINC1");
    params.set("LINECODE", "3");
    params.set("GeoFIPS", "DE");
    params.set("Year", "2014");
    const response = await test_api.getData("REGIONAL", params);
    expect(response.status).equals(200, "Successful status");
  });
});
