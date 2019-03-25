import * as Case from "case";
import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(
      new EnumCaseWalker(sourceFile, this.getOptions())
    );
  }
}

// The walker takes care of all the work.
class EnumCaseWalker extends Lint.RuleWalker {
  public visitEnumDeclaration(node: ts.EnumDeclaration) {
    // check enum name
    if (!this.isCase(node.name.escapedText)) {
      this.report(node, "Enum title " + node.name.escapedText);
    }

    // check enum members for casing
    node.members.forEach((e: any) => {
      if (!this.isCase(e.name.escapedText)) {
        this.report(e, "Enum member " + e.name.escapedText);
      }
    });

    super.visitEnumDeclaration(node);
  }

  private report(node, text): void {
    this.addFailure(
      this.createFailure(
        node.getStart(),
        node.getWidth(),
        text + " should be " + this.getOptions()[0] + " case."
      )
    );
  }

  private isCase(name: ts.__String): boolean {
    const preferedCase = this.getOptions()[0]; // "pascal|camel|snake|kebab";
    let caseConverter = Case.pascal;

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
  }
}
