// Boiler plate code to read in files / spit out output
var fs = require('fs');
googleCodeJamIo = {};

if (process.argv.length !== 4) {
  throw 'Usage is node file_with_google_code_jam_io_required.js [input file] [output file]';
}
var inputFile = process.argv[2];
var outputFile = process.argv[3];

googleCodeJamIo.readFileAsyncByLine = function(fn) {

  var rs = fs.createReadStream(inputFile);
  var remaining = '';

  rs.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      fn(line);
      index = remaining.indexOf('\n');
    }
  });

  rs.on('end', function() {
    if (remaining !== '') {
      fn(remaining);
    }
  });

};

googleCodeJamIo.readFileSync = function() {
  var data = fs.readFileSync(inputFile, 'utf8');
  return data;
};

googleCodeJamIo.writeToFile = function(str) {
  fs.writeFileSync(outputFile, str);
};

googleCodeJamIo.appendToFile = function(str, suffix) {
  if (suffix === undefined) {
    suffix = '\n';
  }
  fs.appendFileSync(outputFile, str + suffix);
};

module.exports = googleCodeJamIo;
