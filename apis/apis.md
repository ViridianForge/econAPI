## APIs

This collection offers libraries that support the following Economic APIs:

### U.S. Bureau of Economic Analysis (BEA)

The BEA API connects to the U.S. Department of Commerce's [Bureau of Economic Anlaysis](https://www.bea.gov/) datasets.

In order to utilize this library, developers will need to obtain an API key from the BEA through their [registration portal](https://apps.bea.gov/API/signup/index.cfm). This API Key is used when instantiating an instance of the BEA API object, and will be used to authenticate all queries to the API.

The BEA hosts a PDF copy of a [complete guide to the API](https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf), which it is recommended to review. The Typescript wrapper in its current form supports the following core queries.

#### GETDATASETLIST
Calling this method will return all datasets currently supported by the API, with details about those datasets.

#### GETPARAMETERLIST
Calling this method with a specification of a dataset will return all parameters available for that particular dataset.

#### GETPARAMETERVALUES
Calling this method with a specification of a dataset with a specific parameter will return the valid values for that parameter.

#### GETPARAMETERVALUESFILTERED
Calling this method with a specification of a dataset with
a specific parameter, along with values to filter the valid
values for that parameter, will return a subset of values
for that parameter.

#### GETDATA
Calling this method on a specified dataset with a set of valid parameters will result in the return of a body of data found via the specified parameter values.