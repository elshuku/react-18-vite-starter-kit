export enum LOADING_STATE {
  INITIALISED = 'INITIALISED',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export enum ERROR_CONDITIONS {
  TypeError = "TypeError",
  General = "General",
  Status404 = "Status404",
  SyntaxError = "SyntaxError",
}

export const ERROR_MESSAGES = {
  [ERROR_CONDITIONS.TypeError]: 'Network error: Could not fetch the response for your request.',
  [ERROR_CONDITIONS.Status404]: '404 - Resource was not found.',
  [ERROR_CONDITIONS.General]: 'General error: Please try again later.',
  [ERROR_CONDITIONS.SyntaxError]: 'Syntax error: This is most likely due to API response not being of type JSON. Make sure you have an API server running and responding in JSON.',
}
export const mapAsyncResponseToErrorMessage = (response: Response | Error)  => {
  let conditionKey = ERROR_CONDITIONS.General;

  if (response instanceof Response){
    const {status } = response;
    if (status && (Object.keys(ERROR_CONDITIONS).includes(`Status${status}`))) {
      conditionKey = ERROR_CONDITIONS[`Status${status}` as ERROR_CONDITIONS];
    }
  } else {
    // (response instanceof Error)
    const { name } = response;
    if (Object.keys(ERROR_CONDITIONS).includes(name)) {
      conditionKey =  name as ERROR_CONDITIONS;
    }
  }

  return ERROR_MESSAGES[conditionKey];
}
