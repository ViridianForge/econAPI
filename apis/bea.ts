import axios, { AxiosResponse } from "axios";
import { URLSearchParams } from "url";

/**
 * Typescript Wrapper to queries to the US Buereau of Economic Analysis (BEA).
 * The class enables making queries to the following BEA end points
 *  - GETDATASETLIST
 *  - GETPARAMETERLIST
 *  - GETPARAMETERVALUES
 *  - GETPARAMETERVALUESFILTERED
 *  - GETDATA
 *
 * To read over the official documenation pof this API, please review:
 * https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf
 *
 */
export class BEA {
  private apiKey: string;
  private resultFormat: string;

  /**
   * Initialize an instance of the BEA API with the given apiKey and resultFormat
   * @param apiKey API Key registered with BEA
   * @param resultFormat format to request results in, valid values are JSON and XML
   */
  constructor(apiKey: string, resultFormat: string) {
    this.apiKey = apiKey;
    this.resultFormat = resultFormat;
  }

  /**
   * Processes a request to the BEA API.
   *
   * @param qParams the query parameters to submit to the BEA API
   */
  async processRequest(qParams: URLSearchParams): Promise<AxiosResponse> {
    qParams.append("USERID", this.apiKey);
    qParams.append("RESULTFORMAT", this.resultFormat);

    const response = await axios.get("https://apps.bea.gov/api/data", {
      params: qParams,
    });
    return response;
  }

  /**
   * Get the list of available BEA Data Sets
   */
  async getDataSetList(): Promise<AxiosResponse> {
    return this.processRequest(new URLSearchParams("METHOD=GETDATASETLIST"));
  }

  /**
   * Retrieves a list of the required and optional parameters for the specified
   * dataset.
   * @param dataSetName the dataset whose parameters are being inquired about
   */
  async getParameterList(dataSetName: string): Promise<AxiosResponse> {
    return this.processRequest(
      new URLSearchParams("METHOD=GETPARAMETERLIST&DATASETNAME=" + dataSetName)
    );
  }

  /**
   * Retrieves a list of the valid values for a named parameter from a named
   * dataset.
   * @param datasetName the dataset that has the named parameter
   * @param parameterName the named parameter to query for valid values
   */
  async getParameterValues(
    dataSetName: string,
    parameterName: string
  ): Promise<AxiosResponse> {
    const reqParams = new URLSearchParams();
    reqParams.append("METHOD", "GETPARAMETERVALUES");
    reqParams.append("DATASETNAME", dataSetName);
    reqParams.append("PARAMETERNAME", parameterName);

    return this.processRequest(reqParams);
  }

  /**
   * Retrieves a list of valid valid values for a named parameter, based on
   * other passed in paremters.
   * @param datasetName the dataset that has the named parameter
   * @param parameterName can be multiple parameters
   * @param additionalParams arbitrary additional parameters to the request
   */
  async getParameterValuesFiltered(
    dataSetName: string,
    targetParam: string,
    additionalParams: Map<string, string>
  ): Promise<AxiosResponse> {
    const reqParams = new URLSearchParams();
    reqParams.append("METHOD", "GETPARAMETERVALUESFILTERED");
    reqParams.append("DATASETNAME", dataSetName);
    reqParams.append("TARGETPARAMETER", targetParam);
    additionalParams.forEach((value: string, key: string) => {
      reqParams.append(key, value);
    });

    return this.processRequest(reqParams);
  }

  /**
   * Retrieves data from a specified dataset using the parameter set
   * passed to the method.
   * @param datasetName the dataset to retrieve data from
   * @param parameterName set of dataset params to grab
   */
  async getData(
    dataSetName: string,
    additionalParams: Map<string, string>
  ): Promise<AxiosResponse> {
    const reqParams = new URLSearchParams();
    reqParams.append("METHOD", "GETDATA");
    reqParams.append("DATASETNAME", dataSetName);
    additionalParams.forEach((value: string, key: string) => {
      reqParams.append(key, value);
    });

    return this.processRequest(reqParams);
  }
}
