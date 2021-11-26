"use strict";
// The MIT License (MIT)
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) 2014 Henric Trotzig
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
const parse_1 = require("./parse");
const fs = require('fs');
const path = require('path');
const requireRelative = require('require-relative');
function findESNamedExports(node) {
    if (node.type !== 'ExportNamedDeclaration') {
        return [];
    }
    if (node.specifiers.length) {
        return node.specifiers.map(({ exported }) => exported.name);
    }
    if (!node.declaration) {
        return [];
    }
    if (node.declaration.type === 'FunctionDeclaration' ||
        node.declaration.type === 'ClassDeclaration') {
        return [node.declaration.id.name];
    }
    const result = [];
    node.declaration.declarations.forEach(({ id }) => {
        if (id.type === 'ObjectPattern') {
            // export const { foo, bar } = something();
            result.push(...id.properties.map(({ key }) => key.name));
        }
        else {
            result.push(id.name);
        }
    });
    return result;
}
function resolveNestedNamedExports(node, absolutePathToFile) {
    if (node.type === 'ConditionalExpression') {
        // Potential ternary-style export - we pick the first one
        // module.exports = foo ? require('a') : require('b');
        return resolveNestedNamedExports(node.consequent, absolutePathToFile);
    }
    if (node.type === 'CallExpression' &&
        node.callee.name === 'require' &&
        node.arguments.length === 1 &&
        node.arguments[0].type === 'StringLiteral') {
        // module.exports = require('someOtherFile.js');
        const pathToRequiredFile = requireRelative.resolve(node.arguments[0].value, path.dirname(absolutePathToFile));
        const requiredFileContent = fs.readFileSync(pathToRequiredFile, 'utf8');
        // eslint-disable-next-line no-use-before-define
        const { named, defaultName } = findExports(requiredFileContent, pathToRequiredFile);
        return {
            named,
            defaultName,
        };
    }
    return undefined;
}
function findCommonJSExports(node, { definedNames, absolutePathToFile, aliasesForExports, }) {
    if (node.type !== 'ExpressionStatement') {
        return [];
    }
    if (node.expression.type === 'CallExpression' &&
        node.expression.callee.type === 'MemberExpression' &&
        aliasesForExports.has(node.expression.callee.object.name) &&
        node.expression.callee.property.name === 'use' &&
        node.expression.arguments.length &&
        node.expression.arguments[0].type === 'Identifier') {
        // exports.use(foo);
        return [node.expression.arguments[0].name];
    }
    if (node.expression.type === 'CallExpression' &&
        node.expression.callee.type === 'MemberExpression' &&
        node.expression.callee.object.name === 'Object' &&
        node.expression.callee.property.name === 'defineProperty' &&
        node.expression.arguments.length > 1 &&
        node.expression.arguments[0].type === 'Identifier' &&
        aliasesForExports.has(node.expression.arguments[0].name) &&
        node.expression.arguments[1].type === 'StringLiteral') {
        // Object.defineProperty(exports, 'foo', { ... });
        return [node.expression.arguments[1].value];
    }
    const { left, right } = node.expression;
    if (!left || !right) {
        return [];
    }
    if ((left.object &&
        left.object.name === 'module' &&
        left.property.name === 'exports') ||
        aliasesForExports.has(left.name)) {
        const nestedNamed = resolveNestedNamedExports(right, absolutePathToFile);
        if (nestedNamed) {
            return nestedNamed;
        }
        // module.exports = { foo: 'foo' };
        if (right.type === 'ObjectExpression') {
            return right.properties.map(({ key }) => key.name).filter(Boolean);
        }
        if (right.type === 'Identifier') {
            return definedNames[right.name] || [];
        }
    }
    if (!left.object || !left.property) {
        return [];
    }
    if (left.object.type === 'MemberExpression' &&
        left.object.object.name === 'module' &&
        left.object.property.name === 'exports') {
        // module.exports.foo = 'bar';
        return [left.property.name];
    }
    if (left.type === 'MemberExpression' &&
        left.object.type === 'Identifier' &&
        aliasesForExports.has(left.object.name)) {
        // exports.foo = 'bar';
        return [left.property.name];
    }
    return [];
}
function findDefinedNames(node, definedNames) {
    if (node.type === 'ExpressionStatement') {
        const { left, right } = node.expression;
        if (left && right) {
            if (left.object) {
                (definedNames[left.object.name] || []).push(left.property.name);
            }
        }
    }
    if (node.type !== 'VariableDeclaration') {
        return;
    }
    node.declarations.forEach(({ id, init }) => {
        if (!init) {
            return;
        }
        if (init.type === 'ObjectExpression') {
            // eslint-disable-next-line no-param-reassign
            definedNames[id.name] = init.properties
                .map(({ key }) => key && key.name)
                .filter(Boolean);
        }
        else if (init.type === 'FunctionExpression') {
            definedNames[id.name] = []; // eslint-disable-line no-param-reassign
        }
    });
}
/**
 * This function will find variable declarations where `exports` is redefined as
 * something else. E.g.
 *
 * const moduleName = exports;
 */
function findAliasesForExports(nodes) {
    const result = new Set(['exports']);
    nodes.forEach((node) => {
        if (node.type !== 'VariableDeclaration') {
            return;
        }
        node.declarations.forEach(({ id, init }) => {
            if (!init) {
                return;
            }
            if (init.type !== 'Identifier') {
                return;
            }
            if (init.name !== 'exports') {
                return;
            }
            // We have something like
            // var foo = exports;
            result.add(id.name);
        });
    });
    return result;
}
function findNamedExports(nodes, { absolutePathToFile, definedNames, aliasesForExports, }) {
    const result = [];
    let defaultName = null;
    nodes.forEach((node) => {
        result.push(...findESNamedExports(node));
        const named = findCommonJSExports(node, {
            definedNames,
            absolutePathToFile,
            aliasesForExports,
        });
        if (Array.isArray(named)) {
            result.push(...named);
        }
        else {
            result.push(...named.named);
            defaultName = named.defaultName;
        }
    });
    return {
        named: result,
        defaultName,
    };
}
function getDefaultExport(nodes) {
    let defaultName = null;
    nodes.some((node) => {
        if (node.type === 'ExportDefaultDeclaration') {
            return true;
        }
        if (node.type !== 'ExpressionStatement') {
            return false;
        }
        // Potential CommonJS export
        const { left, right } = node.expression;
        if (!left || !right) {
            return false;
        }
        if (left.name === 'exports') {
            return true;
        }
        if (!left.object || !left.property) {
            // foo = 'bar';
            return false;
        }
        if (left.object.name === 'module' && left.property.name === 'exports') {
            defaultName = right.name;
            return true;
        }
    });
    return defaultName;
}
const DEFAULT_EXPORT_PATTERN = /\smodule\.exports\s*=\s*(\w+)/;
function findRawDefaultExport(data) {
    const match = data.match(DEFAULT_EXPORT_PATTERN);
    if (match) {
        return match[1];
    }
    return undefined;
}
function findRawNamedExports(data) {
    const result = new Set();
    const pattern = /^exports\.(\w+)\s*=\s*[\w.]+;$/gm;
    let match;
    // eslint-disable-next-line no-cond-assign
    while ((match = pattern.exec(data)) !== null) {
        const name = match[1];
        if (name !== 'default') {
            result.add(name);
        }
    }
    return Array.from(result);
}
function findRootNodes(ast) {
    const realRootNodes = ast.program.body;
    if (realRootNodes.length > 1) {
        return realRootNodes;
    }
    try {
        // Try finding the function body from this case:
        //
        //   (function () {
        //     module.exports = { foo: 'foo' };
        //   }.call(this));
        //
        const { callee } = realRootNodes[0].expression;
        if (callee.object) {
            return callee.object.body.body;
        }
        return callee.body.body;
    }
    catch (e) {
        // ignore
    }
    return realRootNodes;
}
function findExports(data, absolutePathToFile) {
    if (/\.json$/.test(absolutePathToFile)) {
        return {
            named: Object.keys(JSON.parse(data)),
            hasDefault: true,
            defaultName: null,
        };
    }
    const ast = parse_1.default(data);
    const rootNodes = findRootNodes(ast);
    const aliasesForExports = findAliasesForExports(rootNodes);
    const definedNames = {};
    rootNodes.forEach((node) => {
        findDefinedNames(node, definedNames);
    });
    let { named, defaultName } = findNamedExports(rootNodes, {
        absolutePathToFile,
        definedNames,
        aliasesForExports,
    });
    const defaultNameOrigin = getDefaultExport(rootNodes);
    let hasDefault = defaultNameOrigin != null || defaultName != null || aliasesForExports.size > 1;
    if (!hasDefault) {
        const rawExportedId = findRawDefaultExport(data);
        hasDefault = !!rawExportedId;
        if (!named.length) {
            named.push(...(definedNames[rawExportedId] || []));
        }
    }
    if (!named.length) {
        named.push(...findRawNamedExports(data));
    }
    return {
        named,
        hasDefault,
        defaultName: defaultName || defaultNameOrigin,
    };
}
exports.default = findExports;
//# sourceMappingURL=findExports.js.map