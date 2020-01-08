/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
  const outputs = [];
  const input = context.df.getInput();
  input['filename'] = `file_${input['name']}.txt`;

  outputs.push(yield context.df.callActivity("logMessage", input));
  outputs.push(yield context.df.callActivity("sendEmail", input.email));
  outputs.push(yield context.df.callActivity("sendSMS", input));

  return outputs;
});