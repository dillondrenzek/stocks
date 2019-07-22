import mongoose from 'mongoose';

export const withDb = (cb: () => void) => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/stocks-test', { useNewUrlParser: true });
    mongoose.connection.on('error', console.error.bind(console, 'connection error'));
    mongoose.connection.once('open', function() {
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });

  return () => cb();
};
