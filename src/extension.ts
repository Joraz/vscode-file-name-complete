'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{
    const typescriptDocumentSelector: vscode.DocumentSelector = "typescript";
    const completionProvider: vscode.CompletionItemProvider = new ClassNameCompletionProvider();
    const disposable = vscode.languages.registerCompletionItemProvider(typescriptDocumentSelector, completionProvider, ".");
    context.subscriptions.push(disposable);
}

class ClassNameCompletionProvider implements vscode.CompletionItemProvider
{
    public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Array<vscode.CompletionItem>
    {
        const returnArr: Array<vscode.CompletionItem> = [];

        const filePath = document.fileName;
        const splitFilePath: Array<string> = filePath.split("\\");
        const fileName = splitFilePath.pop();
        const fileNameWithoutSuffix = fileName.split(".").shift();

        returnArr.push(new vscode.CompletionItem(fileNameWithoutSuffix, vscode.CompletionItemKind.Text));

        return returnArr;
    }
}