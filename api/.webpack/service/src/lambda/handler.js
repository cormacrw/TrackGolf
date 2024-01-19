/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/db/TrackUTTable.ts":
/*!********************************!*\
  !*** ./src/db/TrackUTTable.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TrackUTTable)
/* harmony export */ });
/* harmony import */ var _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @aws-sdk/client-dynamodb */ "@aws-sdk/client-dynamodb");
/* harmony import */ var _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dynamo_converters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dynamo-converters */ "dynamo-converters");
/* harmony import */ var dynamo_converters__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dynamo_converters__WEBPACK_IMPORTED_MODULE_1__);


const TABLE_NAME = 'TrackUTTable';
class TrackUTTable {
  static getConnection() {
    if (!this.conn) {
      this.connect();
    }
    return this.conn;
  }
  static connect() {
    this.conn = new _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__.DynamoDBClient({
      region: 'us-east-1'
    });
  }
  static async putItem(input) {
    const command = new _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__.PutItemCommand({
      TableName: TABLE_NAME,
      Item: (0,dynamo_converters__WEBPACK_IMPORTED_MODULE_1__.dataToItem)(input)
    });
    await this.getConnection().send(command);
  }
  static async scan(filterExpression, expressionValues) {
    const command = new _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__.ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: filterExpression,
      ExpressionAttributeValues: expressionValues
    });
    const res = await this.getConnection().send(command);
    return this.itemsToData(res.Items || []);
  }
  static async queryPKBeginsWithSK(pk, skBeginsWith) {
    const command = new _aws_sdk_client_dynamodb__WEBPACK_IMPORTED_MODULE_0__.QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: 'tutPk = :pk AND begins_with(tutSk, :sk)',
      ExpressionAttributeValues: {
        ':pk': {
          S: pk
        },
        ':sk': {
          S: skBeginsWith
        }
      }
    });
    const res = await this.getConnection().send(command);
    return this.itemsToData(res.Items || []);
  }
  static itemsToData(items) {
    return items.map(item => (0,dynamo_converters__WEBPACK_IMPORTED_MODULE_1__.itemToData)(item));
  }
}

/***/ }),

/***/ "./src/models/Match.ts":
/*!*****************************!*\
  !*** ./src/models/Match.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MatchModel)
/* harmony export */ });
/* harmony import */ var _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/TrackUTTable */ "./src/db/TrackUTTable.ts");
/* harmony import */ var _utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uuid */ "./src/utils/uuid.ts");


class MatchModel {
  static async createMatch(input) {
    const matchId = (0,_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.generateUUID)();
    const match = {
      tutPk: `user:${input.userId}`,
      tutSk: `match:${matchId}`,
      matchId,
      ...input
    };
    await _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__["default"].putItem(match);
    return match;
  }
  static async findByUserId(userId) {
    const matches = await _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__["default"].queryPKBeginsWithSK(`user:${userId}`, 'match:');
    return matches;
  }
}

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserModel)
/* harmony export */ });
/* harmony import */ var _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../db/TrackUTTable */ "./src/db/TrackUTTable.ts");
/* harmony import */ var _utils_uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uuid */ "./src/utils/uuid.ts");


class UserModel {
  static async createGoogleUser(email, username, googleId) {
    const userId = (0,_utils_uuid__WEBPACK_IMPORTED_MODULE_1__.generateUUID)();
    const user = {
      tutPk: `user:${userId}`,
      tutSk: 'metadata:user',
      userId,
      email,
      username,
      googleId
    };
    await _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__["default"].putItem(user);
    return user;
  }
  static async findByEmail(email) {
    const filterExpression = 'email = :email';
    const expressionValues = {
      ':email': {
        S: email
      }
    };
    const res = await _db_TrackUTTable__WEBPACK_IMPORTED_MODULE_0__["default"].scan(filterExpression, expressionValues);
    return res[0];
  }
}

/***/ }),

/***/ "./src/schema/index.ts":
/*!*****************************!*\
  !*** ./src/schema/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queries */ "./src/schema/queries.ts");
/* harmony import */ var _mutations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutations */ "./src/schema/mutations.ts");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Query: _queries__WEBPACK_IMPORTED_MODULE_0__["default"],
  Mutation: _mutations__WEBPACK_IMPORTED_MODULE_1__["default"]
});

/***/ }),

/***/ "./src/schema/mutations.ts":
/*!*********************************!*\
  !*** ./src/schema/mutations.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Match */ "./src/models/Match.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");


const mutations = {
  createUser: async (_, {
    input
  }) => {
    const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__["default"].createGoogleUser(input.email, input.username, input.googleId);
    return user;
  },
  createMatch: async (_, {
    input
  }) => {
    const match = await _models_Match__WEBPACK_IMPORTED_MODULE_0__["default"].createMatch(input);
    return match;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mutations);

/***/ }),

/***/ "./src/schema/queries.ts":
/*!*******************************!*\
  !*** ./src/schema/queries.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models_Match__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Match */ "./src/models/Match.ts");
/* harmony import */ var _models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/User */ "./src/models/User.ts");


const queries = {
  getUserByEmail: async (_, {
    email
  }) => {
    const user = await _models_User__WEBPACK_IMPORTED_MODULE_1__["default"].findByEmail(email);
    return user;
  },
  getMatchesByUser: async (_, {
    userId
  }) => {
    const matches = await _models_Match__WEBPACK_IMPORTED_MODULE_0__["default"].findByUserId(userId);
    return matches;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (queries);

/***/ }),

/***/ "./src/utils/uuid.ts":
/*!***************************!*\
  !*** ./src/utils/uuid.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateUUID: () => (/* binding */ generateUUID)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "uuid");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);

const generateUUID = () => {
  return (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
};

/***/ }),

/***/ "./src/schema/gql/schema.gql":
/*!***********************************!*\
  !*** ./src/schema/gql/schema.gql ***!
  \***********************************/
/***/ ((module) => {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"tutPk"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tutSk"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userId"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"email"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"username"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"googleId"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"UserInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"username"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"googleId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Match"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"tutPk"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"tutSk"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"matchId"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userScore"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userPossession"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userXG"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userShots"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userPenalties"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"opponentScore"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"opponentXG"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"opponentShots"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"opponentPenalties"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userYellows"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userReds"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"scorers"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"assists"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"InputObjectTypeDefinition","name":{"kind":"Name","value":"MatchInput"},"directives":[],"fields":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userScore"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userPossession"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userXG"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userShots"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userPenalties"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"opponentScore"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"opponentXG"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"opponentShots"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"opponentPenalties"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userYellows"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userReds"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"scorers"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"assists"},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"getUserByEmail"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"email"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"getMatchesByUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userId"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Match"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Mutation"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"createMatch"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"input"},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MatchInput"}}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Match"}},"directives":[]}]}],"loc":{"start":0,"end":1012}};
    doc.loc.source = {"body":"type User {\n  tutPk: String!\n  tutSk: String!\n  userId: String\n  email: String\n  username: String\n  googleId: String\n}\n\ninput UserInput {\n  email: String!\n  username: String!\n  googleId: String!\n}\n\ntype Match {\n  tutPk: String!\n  tutSk: String!\n  matchId: String\n  userScore: Int\n  userPossession: Int\n  userXG: Float\n  userShots: Int\n  userPenalties: Int\n  opponentScore: Int\n  opponentXG: Float\n  opponentShots: Int\n  opponentPenalties: Int\n  userYellows: Int\n  userReds: Int\n  scorers: [String]\n  assists: [String]\n}\n\ninput MatchInput {\n  userId: String!\n  userScore: Int\n  userPossession: Int\n  userXG: Float\n  userShots: Int\n  userPenalties: Int\n  opponentScore: Int\n  opponentXG: Float\n  opponentShots: Int\n  opponentPenalties: Int\n  userYellows: Int\n  userReds: Int\n  scorers: [String]\n  assists: [String]\n}\n\ntype Query {\n  getUserByEmail(email: String!): User\n  getMatchesByUser(userId: String!): [Match]\n}\n\ntype Mutation {\n  createUser(input: UserInput!): User\n  createMatch(input: MatchInput!): Match\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "@aws-sdk/client-dynamodb":
/*!*******************************************!*\
  !*** external "@aws-sdk/client-dynamodb" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@aws-sdk/client-dynamodb");

/***/ }),

/***/ "apollo-server-lambda":
/*!***************************************!*\
  !*** external "apollo-server-lambda" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("apollo-server-lambda");

/***/ }),

/***/ "dynamo-converters":
/*!************************************!*\
  !*** external "dynamo-converters" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("dynamo-converters");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************!*\
  !*** ./src/lambda/handler.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handle: () => (/* binding */ handle)
/* harmony export */ });
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server-lambda */ "apollo-server-lambda");
/* harmony import */ var apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _schema__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schema */ "./src/schema/index.ts");
/* harmony import */ var _schema_gql_schema_gql__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../schema/gql/schema.gql */ "./src/schema/gql/schema.gql");
/* harmony import */ var _schema_gql_schema_gql__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_schema_gql_schema_gql__WEBPACK_IMPORTED_MODULE_2__);



const server = new apollo_server_lambda__WEBPACK_IMPORTED_MODULE_0__.ApolloServer({
  typeDefs: (_schema_gql_schema_gql__WEBPACK_IMPORTED_MODULE_2___default()),
  resolvers: _schema__WEBPACK_IMPORTED_MODULE_1__["default"]
});
const handle = server.createHandler();
})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=handler.js.map