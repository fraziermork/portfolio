//the purpose of this module is to hold the methods to compile the handlebars templates for indiviudalized article things
//article options types are imageOption, textOption, functionOption, demoOption
//imageOption: just requires an object with a single url attribute
//textOption: requires an object with properties articleOptionClass, articleOptionId, optionText
//functionOption: requires the name of a function attached as a method to individualize, a selector for what to attach it to, an eventType, and any other relevant parameters 
//demoOption: not sure what this requires yet

//currentOption, articleOptionIndex, articleOptionArray, $articleToAppendTo are the three parameters passed to the builder

(function(module){
  individualize = {};
  var imageTemplate = Handlebars.compile($('#article-image-template').html());
  var optionTemplate = Handlebars.compile($('#article-option-template').html());

  individualize.buildArticleOption = function(currentOption, articleOptionIndex, articleOptionArray, $articleToAppendTo){
    switch (currentOption.optiontype) {
      case imageOption:// eslint-disable-line
        individualize.buildImageOption(currentOption, $articleToAppendTo);// eslint-disable-line
        break;// eslint-disable-line
      case textOption:// eslint-disable-line
        individualize.buildTextOption(currentOption, $articleToAppendTo);// eslint-disable-line
        break;// eslint-disable-line
      case functionOption:// eslint-disable-line
        individualize.buildFunctionOption(currentOption, $articleToAppendTo);// eslint-disable-line
        break;// eslint-disable-line
      case demoOption:// eslint-disable-line
        individualize.buildDemoOption(currentOption, $articleToAppendTo);// eslint-disable-line
        break;// eslint-disable-line
    }
  };

  individualize.buildImageOption = function(currentOption, $articleToAppendTo){

  };
  individualize.buildTextOption = function(currentOption, $articleToAppendTo){

  };
  individualize.buildFunctionOption = function(currentOption, $articleToAppendTo){

  };
  individualize.buildDemoOption = function(currentOption, $articleToAppendTo){

  };


  module.individualize = individualize;
})(window);
