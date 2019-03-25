"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Case = require("case");
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = /** @class */ (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitEnumDeclaration = function (node) {
        var _this = this;
        // check enum name
        if (!this.isCase(node.name.escapedText)) {
            this.report(node, "Enum title " + node.name.escapedText);
        }
        // check enum members for casing
        node.members.forEach(function (e) {
            if (!_this.isCase(e.name.escapedText)) {
                _this.report(e, "Enum member " + e.name.escapedText);
            }
        });
        _super.prototype.visitEnumDeclaration.call(this, node);
    };
    NoImportsWalker.prototype.report = function (node, text) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text + " should be pascal case."));
    };
    NoImportsWalker.prototype.isCase = function (name) {
        var preferedCase = this.getOptions()[0]; // "pascal|camel|snake|kebab";
        var caseConverter = Case.pascal;
        switch (preferedCase) {
            case "camel":
                caseConverter = Case.camel;
                break;
            case "snake":
                caseConverter = Case.snake;
                break;
            case "kebab":
                caseConverter = Case.kebab;
                break;
            default:
                break;
        }
        return name === caseConverter(name.toString());
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
