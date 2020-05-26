/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

const grpc = {};
grpc.web = require("grpc-web");

const proto = {};
proto.v1 = require("./BeliveRTM_pb.js");

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.v1.BeliveRtmClient = function (hostname, credentials, options) {
	if (!options) options = {};
	options["format"] = "text";
	
	/**
	 * @private @const {!grpc.web.GrpcWebClientBase} The client
	 */
	this.client_ = new grpc.web.GrpcWebClientBase(options);
	
	/**
	 * @private @const {string} The hostname
	 */
	this.hostname_ = hostname;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.v1.BeliveRtmPromiseClient = function (hostname, credentials, options) {
	if (!options) options = {};
	options["format"] = "text";
	
	/**
	 * @private @const {!grpc.web.GrpcWebClientBase} The client
	 */
	this.client_ = new grpc.web.GrpcWebClientBase(options);
	
	/**
	 * @private @const {string} The hostname
	 */
	this.hostname_ = hostname;
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.LogInRequest,
 *   !proto.v1.LogInResponse>}
 */
const methodDescriptor_BeliveRtm_LogIn = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/LogIn",
	grpc.web.MethodType.UNARY,
	proto.v1.LogInRequest,
	proto.v1.LogInResponse,
	/**
	 * @param {!proto.v1.LogInRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.LogInResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.LogInRequest,
 *   !proto.v1.LogInResponse>}
 */
const methodInfo_BeliveRtm_LogIn = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.LogInResponse,
	/**
	 * @param {!proto.v1.LogInRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.LogInResponse.deserializeBinary
);

/**
 * @param {!proto.v1.LogInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.LogInResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.LogInResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.logIn = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/LogIn",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_LogIn,
		callback
	);
};

/**
 * @param {!proto.v1.LogInRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.LogInResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.logIn = function (request, metadata) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/LogIn",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_LogIn
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.LogOutRequest,
 *   !proto.v1.LogOutResponse>}
 */
const methodDescriptor_BeliveRtm_LogOut = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/LogOut",
	grpc.web.MethodType.UNARY,
	proto.v1.LogOutRequest,
	proto.v1.LogOutResponse,
	/**
	 * @param {!proto.v1.LogOutRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.LogOutResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.LogOutRequest,
 *   !proto.v1.LogOutResponse>}
 */
const methodInfo_BeliveRtm_LogOut = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.LogOutResponse,
	/**
	 * @param {!proto.v1.LogOutRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.LogOutResponse.deserializeBinary
);

/**
 * @param {!proto.v1.LogOutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.LogOutResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.LogOutResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.logOut = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/LogOut",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_LogOut,
		callback
	);
};

/**
 * @param {!proto.v1.LogOutRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.LogOutResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.logOut = function (request, metadata) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/LogOut",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_LogOut
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.GetUsersInChannelRequest,
 *   !proto.v1.GetUsersInChannelResponse>}
 */
const methodDescriptor_BeliveRtm_GetUsersInChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/GetUsersInChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.GetUsersInChannelRequest,
	proto.v1.GetUsersInChannelResponse,
	/**
	 * @param {!proto.v1.GetUsersInChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.GetUsersInChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.GetUsersInChannelRequest,
 *   !proto.v1.GetUsersInChannelResponse>}
 */
const methodInfo_BeliveRtm_GetUsersInChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.GetUsersInChannelResponse,
	/**
	 * @param {!proto.v1.GetUsersInChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.GetUsersInChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.GetUsersInChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.GetUsersInChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.GetUsersInChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.getUsersInChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/GetUsersInChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_GetUsersInChannel,
		callback
	);
};

/**
 * @param {!proto.v1.GetUsersInChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.GetUsersInChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.getUsersInChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/GetUsersInChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_GetUsersInChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.GetUserAmountInChannelRequest,
 *   !proto.v1.GetUserAmountInChannelResponse>}
 */
const methodDescriptor_BeliveRtm_GetUserAmountInChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/GetUserAmountInChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.GetUserAmountInChannelRequest,
	proto.v1.GetUserAmountInChannelResponse,
	/**
	 * @param {!proto.v1.GetUserAmountInChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.GetUserAmountInChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.GetUserAmountInChannelRequest,
 *   !proto.v1.GetUserAmountInChannelResponse>}
 */
const methodInfo_BeliveRtm_GetUserAmountInChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.GetUserAmountInChannelResponse,
	/**
	 * @param {!proto.v1.GetUserAmountInChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.GetUserAmountInChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.GetUserAmountInChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.GetUserAmountInChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.GetUserAmountInChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.getUserAmountInChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/GetUserAmountInChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_GetUserAmountInChannel,
		callback
	);
};

/**
 * @param {!proto.v1.GetUserAmountInChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.GetUserAmountInChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.getUserAmountInChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/GetUserAmountInChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_GetUserAmountInChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.UploadChatFileToS3Request,
 *   !proto.v1.UploadChatFileToS3Response>}
 */
const methodDescriptor_BeliveRtm_UploadChatFileToS3 = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/UploadChatFileToS3",
	grpc.web.MethodType.UNARY,
	proto.v1.UploadChatFileToS3Request,
	proto.v1.UploadChatFileToS3Response,
	/**
	 * @param {!proto.v1.UploadChatFileToS3Request} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.UploadChatFileToS3Response.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.UploadChatFileToS3Request,
 *   !proto.v1.UploadChatFileToS3Response>}
 */
const methodInfo_BeliveRtm_UploadChatFileToS3 = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.UploadChatFileToS3Response,
	/**
	 * @param {!proto.v1.UploadChatFileToS3Request} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.UploadChatFileToS3Response.deserializeBinary
);

/**
 * @param {!proto.v1.UploadChatFileToS3Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.UploadChatFileToS3Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.UploadChatFileToS3Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.uploadChatFileToS3 = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/UploadChatFileToS3",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_UploadChatFileToS3,
		callback
	);
};

/**
 * @param {!proto.v1.UploadChatFileToS3Request} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.UploadChatFileToS3Response>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.uploadChatFileToS3 = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/UploadChatFileToS3",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_UploadChatFileToS3
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.SubcribeChannelRequest,
 *   !proto.v1.SubcribeChannelResponse>}
 */
const methodDescriptor_BeliveRtm_SubcribeChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/SubcribeChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.SubcribeChannelRequest,
	proto.v1.SubcribeChannelResponse,
	/**
	 * @param {!proto.v1.SubcribeChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SubcribeChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.SubcribeChannelRequest,
 *   !proto.v1.SubcribeChannelResponse>}
 */
const methodInfo_BeliveRtm_SubcribeChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.SubcribeChannelResponse,
	/**
	 * @param {!proto.v1.SubcribeChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SubcribeChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.SubcribeChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.SubcribeChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.SubcribeChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.subcribeChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/SubcribeChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SubcribeChannel,
		callback
	);
};

/**
 * @param {!proto.v1.SubcribeChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.SubcribeChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.subcribeChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/SubcribeChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SubcribeChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.UnsubscribeChannelRequest,
 *   !proto.v1.UnsubscribeChannelResponse>}
 */
const methodDescriptor_BeliveRtm_UnsubscribeChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/UnsubscribeChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.UnsubscribeChannelRequest,
	proto.v1.UnsubscribeChannelResponse,
	/**
	 * @param {!proto.v1.UnsubscribeChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.UnsubscribeChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.UnsubscribeChannelRequest,
 *   !proto.v1.UnsubscribeChannelResponse>}
 */
const methodInfo_BeliveRtm_UnsubscribeChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.UnsubscribeChannelResponse,
	/**
	 * @param {!proto.v1.UnsubscribeChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.UnsubscribeChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.UnsubscribeChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.UnsubscribeChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.UnsubscribeChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.unsubscribeChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/UnsubscribeChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_UnsubscribeChannel,
		callback
	);
};

/**
 * @param {!proto.v1.UnsubscribeChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.UnsubscribeChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.unsubscribeChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/UnsubscribeChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_UnsubscribeChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.SendPeerToPeerMessageRequest,
 *   !proto.v1.SendPeerToPeerMessageResponse>}
 */
const methodDescriptor_BeliveRtm_SendPeerToPeerMessage = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/SendPeerToPeerMessage",
	grpc.web.MethodType.UNARY,
	proto.v1.SendPeerToPeerMessageRequest,
	proto.v1.SendPeerToPeerMessageResponse,
	/**
	 * @param {!proto.v1.SendPeerToPeerMessageRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SendPeerToPeerMessageResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.SendPeerToPeerMessageRequest,
 *   !proto.v1.SendPeerToPeerMessageResponse>}
 */
const methodInfo_BeliveRtm_SendPeerToPeerMessage = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.SendPeerToPeerMessageResponse,
	/**
	 * @param {!proto.v1.SendPeerToPeerMessageRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SendPeerToPeerMessageResponse.deserializeBinary
);

/**
 * @param {!proto.v1.SendPeerToPeerMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.SendPeerToPeerMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.SendPeerToPeerMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.sendPeerToPeerMessage = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/SendPeerToPeerMessage",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SendPeerToPeerMessage,
		callback
	);
};

/**
 * @param {!proto.v1.SendPeerToPeerMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.SendPeerToPeerMessageResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.sendPeerToPeerMessage = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/SendPeerToPeerMessage",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SendPeerToPeerMessage
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.SendChannelMessageRequest,
 *   !proto.v1.SendChannelMessageResponse>}
 */
const methodDescriptor_BeliveRtm_SendChannelMessage = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/SendChannelMessage",
	grpc.web.MethodType.UNARY,
	proto.v1.SendChannelMessageRequest,
	proto.v1.SendChannelMessageResponse,
	/**
	 * @param {!proto.v1.SendChannelMessageRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SendChannelMessageResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.SendChannelMessageRequest,
 *   !proto.v1.SendChannelMessageResponse>}
 */
const methodInfo_BeliveRtm_SendChannelMessage = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.SendChannelMessageResponse,
	/**
	 * @param {!proto.v1.SendChannelMessageRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.SendChannelMessageResponse.deserializeBinary
);

/**
 * @param {!proto.v1.SendChannelMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.SendChannelMessageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.SendChannelMessageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.sendChannelMessage = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/SendChannelMessage",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SendChannelMessage,
		callback
	);
};

/**
 * @param {!proto.v1.SendChannelMessageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.SendChannelMessageResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.sendChannelMessage = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/SendChannelMessage",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_SendChannelMessage
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.ReleaseChannelRequest,
 *   !proto.v1.ReleaseChannelResponse>}
 */
const methodDescriptor_BeliveRtm_ReleaseChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/ReleaseChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.ReleaseChannelRequest,
	proto.v1.ReleaseChannelResponse,
	/**
	 * @param {!proto.v1.ReleaseChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.ReleaseChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ReleaseChannelRequest,
 *   !proto.v1.ReleaseChannelResponse>}
 */
const methodInfo_BeliveRtm_ReleaseChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.ReleaseChannelResponse,
	/**
	 * @param {!proto.v1.ReleaseChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.ReleaseChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.ReleaseChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.ReleaseChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ReleaseChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.releaseChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/ReleaseChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_ReleaseChannel,
		callback
	);
};

/**
 * @param {!proto.v1.ReleaseChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.ReleaseChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.releaseChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/ReleaseChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_ReleaseChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.AdminActionChannelRequest,
 *   !proto.v1.AdminActionChannelResponse>}
 */
const methodDescriptor_BeliveRtm_AdminActionChannel = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/AdminActionChannel",
	grpc.web.MethodType.UNARY,
	proto.v1.AdminActionChannelRequest,
	proto.v1.AdminActionChannelResponse,
	/**
	 * @param {!proto.v1.AdminActionChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.AdminActionChannelResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.AdminActionChannelRequest,
 *   !proto.v1.AdminActionChannelResponse>}
 */
const methodInfo_BeliveRtm_AdminActionChannel = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.AdminActionChannelResponse,
	/**
	 * @param {!proto.v1.AdminActionChannelRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.AdminActionChannelResponse.deserializeBinary
);

/**
 * @param {!proto.v1.AdminActionChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.AdminActionChannelResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.AdminActionChannelResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.adminActionChannel = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/AdminActionChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_AdminActionChannel,
		callback
	);
};

/**
 * @param {!proto.v1.AdminActionChannelRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.AdminActionChannelResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.adminActionChannel = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/AdminActionChannel",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_AdminActionChannel
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.PeerToPeerActionRequest,
 *   !proto.v1.PeerToPeerActionResponse>}
 */
const methodDescriptor_BeliveRtm_PeerToPeerAction = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/PeerToPeerAction",
	grpc.web.MethodType.UNARY,
	proto.v1.PeerToPeerActionRequest,
	proto.v1.PeerToPeerActionResponse,
	/**
	 * @param {!proto.v1.PeerToPeerActionRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.PeerToPeerActionResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.PeerToPeerActionRequest,
 *   !proto.v1.PeerToPeerActionResponse>}
 */
const methodInfo_BeliveRtm_PeerToPeerAction = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.PeerToPeerActionResponse,
	/**
	 * @param {!proto.v1.PeerToPeerActionRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.PeerToPeerActionResponse.deserializeBinary
);

/**
 * @param {!proto.v1.PeerToPeerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.PeerToPeerActionResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.PeerToPeerActionResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.peerToPeerAction = function (
	request,
	metadata,
	callback
) {
	return this.client_.rpcCall(
		this.hostname_ + "/v1.BeliveRtm/PeerToPeerAction",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_PeerToPeerAction,
		callback
	);
};

/**
 * @param {!proto.v1.PeerToPeerActionRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.PeerToPeerActionResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.BeliveRtmPromiseClient.prototype.peerToPeerAction = function (
	request,
	metadata
) {
	return this.client_.unaryCall(
		this.hostname_ + "/v1.BeliveRtm/PeerToPeerAction",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_PeerToPeerAction
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.ChannelStreamRequest,
 *   !proto.v1.ChannelStreamResponse>}
 */
const methodDescriptor_BeliveRtm_ChannelStream = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/ChannelStream",
	grpc.web.MethodType.SERVER_STREAMING,
	proto.v1.ChannelStreamRequest,
	proto.v1.ChannelStreamResponse,
	/**
	 * @param {!proto.v1.ChannelStreamRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.ChannelStreamResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ChannelStreamRequest,
 *   !proto.v1.ChannelStreamResponse>}
 */
const methodInfo_BeliveRtm_ChannelStream = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.ChannelStreamResponse,
	/**
	 * @param {!proto.v1.ChannelStreamRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.ChannelStreamResponse.deserializeBinary
);

/**
 * @param {!proto.v1.ChannelStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ChannelStreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.channelStream = function (request, metadata) {
	return this.client_.serverStreaming(
		this.hostname_ + "/v1.BeliveRtm/ChannelStream",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_ChannelStream
	);
};

/**
 * @param {!proto.v1.ChannelStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ChannelStreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmPromiseClient.prototype.channelStream = function (
	request,
	metadata
) {
	return this.client_.serverStreaming(
		this.hostname_ + "/v1.BeliveRtm/ChannelStream",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_ChannelStream
	);
};

/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.PeerStreamRequest,
 *   !proto.v1.PeerStreamResponse>}
 */
const methodDescriptor_BeliveRtm_PeerToPeerStream = new grpc.web.MethodDescriptor(
	"/v1.BeliveRtm/PeerToPeerStream",
	grpc.web.MethodType.SERVER_STREAMING,
	proto.v1.PeerStreamRequest,
	proto.v1.PeerStreamResponse,
	/**
	 * @param {!proto.v1.PeerStreamRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.PeerStreamResponse.deserializeBinary
);

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.PeerStreamRequest,
 *   !proto.v1.PeerStreamResponse>}
 */
const methodInfo_BeliveRtm_PeerToPeerStream = new grpc.web.AbstractClientBase.MethodInfo(
	proto.v1.PeerStreamResponse,
	/**
	 * @param {!proto.v1.PeerStreamRequest} request
	 * @return {!Uint8Array}
	 */
	function (request) {
		return request.serializeBinary();
	},
	proto.v1.PeerStreamResponse.deserializeBinary
);

/**
 * @param {!proto.v1.PeerStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.v1.PeerStreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmClient.prototype.peerToPeerStream = function (
	request,
	metadata
) {
	return this.client_.serverStreaming(
		this.hostname_ + "/v1.BeliveRtm/PeerToPeerStream",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_PeerToPeerStream
	);
};

/**
 * @param {!proto.v1.PeerStreamRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.v1.PeerStreamResponse>}
 *     The XHR Node Readable Stream
 */
proto.v1.BeliveRtmPromiseClient.prototype.peerToPeerStream = function (
	request,
	metadata
) {
	return this.client_.serverStreaming(
		this.hostname_ + "/v1.BeliveRtm/PeerToPeerStream",
		request,
		metadata || {},
		methodDescriptor_BeliveRtm_PeerToPeerStream
	);
};

module.exports = proto.v1;
