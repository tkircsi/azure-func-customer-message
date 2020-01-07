/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env['SENDGRID_API_KEY']);

module.exports = async function (context) {
  const email = context.bindings.email;
  const msg = {
    to: email,
    from: { email: 'tibcsi@azure.dev', name: 'Tibor Kircsi(Azure)' },
    subject: `Fundamenta teszt üzenet.`,
    html: `<h4>Tisztelt Ügyfelünk!</h4> <p>Ez már valami!</p>`
  };
sgMail.send(msg);

    return msg;
};