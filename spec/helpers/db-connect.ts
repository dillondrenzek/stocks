import mongoose from 'mongoose';

export const withDb = (connectionString: string, cb: () => void) => {
  before((done) => {
    mongoose.connect(connectionString, { useNewUrlParser: true });
    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function () {
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });

  return () => cb();
};