trackflow.factory("FilePreviewFactory", [
 function () {
  var factory = {};

  factory.initFileSelectionListener = function (scope, cb) {
   scope.$on("fileSelected", function (event, files) {
    console.log("Files: ", typeof files[0]);

    var objectUrls = Object.keys(files).map(function (key) {
     var blobUrl = URL.createObjectURL(files[key]);
     return { url: blobUrl, type: files[key].type };
    });

    cb(objectUrls);
   });
  };

  return factory;
 },
]);
