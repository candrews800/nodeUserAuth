var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('users', {
    id: { type: 'serial', primaryKey: true },
    email: 'varchar(100)',
    password: 'varchar(128)',
    confirmation_code: 'varchar(128)',
    confirmed: 'boolean',
    created_at: 'timestamp',

  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('users', function(err) {
    if (err) { callback(err); return; }
    db.dropTable('owners', callback);
  });
};
