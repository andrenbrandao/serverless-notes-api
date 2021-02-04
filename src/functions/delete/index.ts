export default {
  handler: `${__dirname.split(process.cwd())[1].substring(1)}/handler.main`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'notes/{id}',
        authorizer: 'aws_iam',
        cors: true,
      },
    },
  ],
};
